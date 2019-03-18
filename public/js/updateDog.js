$(".deleteDog").on("click", () => {
    Swal.fire({
        title: 'Are you sure you want to delete the Dog?',
        text: "You won't be able to revert this!",
        type: 'warning',
        width: '100%',
        heightAuto: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete them!'
    }).then((result) => {
        if (result.value) {
            const id = $(".deleteDog").data("id");
            $.ajax({
                url: "/api/deletedog",
                type: "DELETE",
                data: { id },
                datatype: "json",
                success: (userID) => {
                    Swal.fire(
                        'Deleted!',
                        'Doggo has been deleted.',
                        'success'
                    ).then(() => {
                        window.location.replace(`/user/${userID}`)
                    });
                }
            });
        };
    });
});

$(".lostDog").on("click", async function () {
    const lostDog = {};
    lostDog.id = $(this).data("id");
    lostDog.dogName = $(this).data("name");
    lostDog.breed = $(this).data("breed");

    await Swal.fire({
        title: 'Help us find them!',
        input: 'text',
        showCancelButton: true,
        inputValidator: (value) => {
            return !value && 'You need to write something!'
        }
    }).then((result) => {
        if (result.value) {
            lostDog.text = result.value;
            $.ajax({
                url: "/api/lostdog",
                type: "POST",
                data: lostDog,
                datatype: "json",
                success: (res) => {
                    window.location.href = res.redirect;
                }
            })
        }
    })
})