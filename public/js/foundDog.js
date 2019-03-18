$(`.foundDog`).on(`click`, function () {
    Swal.fire({
        title: "Yay! Welcome home!",
        type: "success",
        width: '100%',
        heightAuto: false,
    }).then(() => {
        const id = $(this).val();
        $.ajax({
            url: "/api/founddog",
            type: "PUT",
            data: { id },
            datatype: "json",
            success: function (userID) {
                window.location.replace(`/user/${userID}`)
            }
        });
    });
});