const db = require("../models");

module.exports = {
    //TODO have error handling if the user doesn't upload a post photo, or have a placeholder photo until they do
    createPost: async function (newPost, userID, ) {
        //Add the user's ID to the new post object, so we can assign the foreign key in the posts table
        newPost.UserId = userID;

        // Write the new post that was just inputted into the database
        await db.Posts.create(newPost).then(function (dbPost) {
            console.log("Success")
        });
        //Must have return outside of the functions above to get the await working
        return userID
    },
    getUserPosts: async function (userID, loggedInID) {
        //Build the user object so we can move it to handlebars to display
        let user = {};
        user.userProfile = {};
        user.userPostsArray = [];
        user.userProfile.id = userID;
        //First get the username from the user table
        await db.User.findOne({ where: { id: userID } }).then(function (userInfo) {
            user.userProfile.userName = `${userInfo.firstname} ${userInfo.lastname}`
        });

        if (+userID === loggedInID) {
            user.userProfile.isCurrentUser = true;
        };
        console.log(user)
        //Then query the posts database to get all the posts that belong to that user
        await db.Posts.findAll({ where: { UserId: userID } }).then(function (posts) {
            //Gets all the posts and adds it to the userProfile object to then display to the user
            posts.forEach(function (post) {
                let userpost = {};
                userpost.name = post.text;
                userpost.id = post.id;
                userpost.type = post.post_type;
                user.userPostsArray.push(userpost);
            });
            return user.userPostsArray;
        });
        return user;
    },
    getAllPosts: async function (loggedInID) {
        let user = {};
        user.feed = {};
        user.allPostsArray = [];

        // console.log(user)
        await db.Posts.findAll({ where: { $or: [{ post_type: { $eq: "Dog Post" } }, { post_type: { $eq: "Meet Up" } }] } })
            .then(function (posts) {
                posts.forEach(async function (post) {
                    let feed = {};

                    feed.UserId = post.UserId;
                    feed.body = post.text;
                    feed.type = post.post_type;
                    feed.breed = post.breed.toLowerCase()
                        .split(' ')
                        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(' ');
                    feed.username = "";
                    user.allPostsArray.push(feed);
                });
            }).then(() => {
                for (let i = 0; i < user.allPostsArray.length; i++) {
                    console.log(user.allPostsArray[i].UserId)
                    let firstname = "";
                    db.User.find({ where: { id: user.allPostsArray[i].UserId } })
                        .then(user => {
                            firstname = user.firstname
                        }).then(() => {
                            user.allPostsArray[i].username = firstname
                        });
                };

            });
        return user;

    },
    updatePost: async function (updatedPost) {
        let userID = "";
        //When querying the post database pull the userID
        await db.Posts.findOne({ where: { id: updatedPost.id } }).then(function (post) {
            userID = post.UserId;
        });

        //If they inputted a new post then this updates it
        if (updatedPost.text !== "") {
            await db.Posts.update({ text: updatedPost.text }, { where: { id: updatedPost.id } })
        }
        return userID
    },
    deletePost: async function (postID) {
        let userID = "";
        await db.Posts.destroy({ where: { id: postID } });

        return userID;
    }
};