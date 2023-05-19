const createModal = () => {
    const bgModal = document.createElement("section");

    const form = document.createElement("form");

    const inputName = document.createElement("input");
    const inputCategory = document.createElement("input");
    const inputQuantity = document.createElement("input");
    const inputPrice = document.createElement("input");
    const labelName = document.createElement("label");
    const labelCategory = document.createElement("label");
    const labelQuantity = document.createElement("label");
    const labelPrice = document.createElement("label");
    const buttonUpdateModal = document.createElement("button");
    const buttonRegisterModal = document.createElement("button");
    const removeFormAndModal = document.createElement("span");



    return {
        inputCategory: inputCategory,
        inputName: inputName,
        inputQuantity: inputQuantity,
        inputPrice: inputPrice,
        form: form,
        bgModal: bgModal,
        labelName: labelName,
        labelCategory: labelCategory,
        labelQuantity: labelQuantity,
        labelPrice: labelPrice,
        buttonUpdateModal: buttonUpdateModal,
        buttonRegisterModal: buttonRegisterModal,
        removeFormAndModal: removeFormAndModal
    };
};

export default createModal