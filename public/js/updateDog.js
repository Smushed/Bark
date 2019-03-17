$(".deleteDog").on("click", () => {
    Swal.fire('Are you sure you want to delete Doggo?')

    // const id = $(".deleteDog").data("id");
    // $.ajax({
    //     url: "/api/deletedog",
    //     type: "DELETE",
    //     data: { id },
    //     datatype: "json",
    //     success: (userID) => {
    //         window.location.replace(`/user/${userID}`)
    //     }
    // });
});

