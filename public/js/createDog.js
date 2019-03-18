const validateNewDog = () => {
    if ($(`.fileUpload`).val() === `` || $(`.updatedDogName`).val() === ``) {
        $(`.errorMessage`).show();
        event.preventDefault();
    };
};