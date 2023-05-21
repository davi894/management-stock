import imageUpdateProduct from "./src/assets/links/imageUpdateProduct.js";
import { createModal, createTableRow } from "./src/components/index.js";
import { formattedPrice, setIdsAndSortPrice } from "./src/utils/index.js";
import {
    bodyHtml,
    btnRegisterProd,
    divTable,
    keysStock,
    sectionHtml
} from "./src/global/variables/variables.js";
import { updateProduct } from "./src/services/index.js";
import imageDeleteProduct from "./src/assets/links/imageDeleteProduct.js";
import imageBottomUpdateModal from "./src/assets/links/imageBottomUpdateModal.js";

const arrayStock = setIdsAndSortPrice();
let newArray = [];

const createTable = () => {
    const table = document.createElement("table");
    const thead = document.createElement("thead");

    keysStock.forEach((e) => {
        const th = document.createElement("th");
        th.textContent = e;
        thead.append(th);
    });

    table.append(thead);

    [...arrayStock, ...newArray].forEach(
        ({ name, quantity, category, price, availability, id }) => {
            const {
                buttonDelete,
                tbody,
                tdName,
                tdCategory,
                tdQuantity,
                tdPrice,
                tdAvailability,
                imgUpdate,
                buttonUpdateOpenModal,
                imgDelete
            } = createTableRow();

            imgUpdate.src = imageUpdateProduct;
            imgDelete.src = imageDeleteProduct;

            buttonDelete.append(imgDelete)
            buttonUpdateOpenModal.append(imgUpdate);

            buttonUpdateOpenModal.addEventListener("click", () => {

                const {
                    inputPrice,
                    bgModal,
                    form,
                    inputCategory,
                    inputName,
                    inputQuantity,
                    labelName,
                    labelCategory,
                    labelQuantity,
                    labelPrice,
                    buttonUpdateModal,
                    imgUpdateModal
                } = createModal();

                inputName.defaultValue = `${name}`;
                inputQuantity.defaultValue = `${quantity}`;
                inputCategory.defaultValue = `${category}`;
                inputPrice.defaultValue = price;

                labelName.textContent = "Name";
                labelCategory.textContent = "Category";
                labelQuantity.textContent = "Quantity";
                labelPrice.textContent = "Price";

                imgUpdateModal.src = imageBottomUpdateModal

                buttonUpdateModal.append(imgUpdateModal)

                bgModal.setAttribute("id", "bgModal");
                form.setAttribute("id", "formModal");
                buttonUpdateModal.setAttribute("id", "btnModalUpdate");

                const removeModal = () => {
                    bgModal.remove();
                    form.remove();
                };

                bgModal.addEventListener("click", removeModal);

                form.addEventListener("submit", (e) => {
                    e.preventDefault();

                    const valueName = inputName.value;
                    const valueCategory = inputCategory.value;
                    const valueQuantity = inputQuantity.value;
                    const valuePrice = inputPrice.value;

                    const valueQuantityFormatted = parseInt(valueQuantity);
                    const valuePriceFormattedString = valuePrice.replace("R$", "");
                    const valuePriceFormattedNumber = parseInt(valuePriceFormattedString);

                    const resultUpdateModel = updateProduct({
                        id,
                        valueName,
                        valueCategory,
                        valueQuantityFormatted,
                        valuePriceFormattedNumber,
                        valueQuantityFormatted
                    });

                    const {
                        category,
                        quantity,
                        name,
                        price,
                        availability
                    } = resultUpdateModel;

                    const responseFormattedPrice = formattedPrice(price);

                    tdPrice.textContent = responseFormattedPrice;
                    tdName.textContent = name;
                    tdCategory.textContent = category;
                    tdQuantity.textContent = quantity;
                    tdAvailability.textContent = availability;

                    tbody.append(
                        tdName,
                        tdCategory,
                        tdQuantity,
                        tdPrice,
                        tdAvailability,
                        buttonUpdateOpenModal,
                        buttonDelete
                    );

                    table.append(tbody);
                    divTable.append(table);
                    sectionHtml.append(divTable);

                    removeModal();

                    alert("Product has been updated successfully!");
                });

                form.append(
                    labelName,
                    inputName,
                    labelCategory,
                    inputCategory,
                    labelQuantity,
                    inputQuantity,
                    labelPrice,
                    inputPrice,
                    buttonUpdateModal
                );

                bodyHtml.append(form);
                bodyHtml.append(bgModal);
            });

            tbody.id = id;
            buttonDelete.id = id;
            buttonDelete.className = "btnDelete";

            buttonDelete.addEventListener("click", (e) => {
                newArray.splice(newArray.findIndex(item => item.id === id), 1);
                tbody.remove();
            });

            const responseFormattedPrice = formattedPrice(price);

            tdPrice.textContent = responseFormattedPrice;
            tdName.textContent = name;
            tdCategory.textContent = category;
            tdQuantity.textContent = quantity;
            tdAvailability.textContent = availability;

            tbody.append(
                tdName,
                tdCategory,
                tdQuantity,
                tdPrice,
                tdAvailability,
                buttonUpdateOpenModal,
                buttonDelete
            );

            table.append(tbody);
        }
    );

    divTable.append(table);
    sectionHtml.append(divTable);
};

createTable();

btnRegisterProd.addEventListener("click", () => {
    const {
        inputPrice,
        bgModal,
        form,
        inputCategory,
        inputName,
        inputQuantity,
        labelName,
        labelCategory,
        labelQuantity,
        labelPrice,
        buttonRegisterModal,
        imgUpdateModal,
        removeFormAndModal
    } = createModal();

    inputName.defaultValue = "";
    inputQuantity.defaultValue = "";
    inputCategory.defaultValue = "";
    inputPrice.defaultValue = "";

    labelName.textContent = "Name";
    labelCategory.textContent = "Category";
    labelQuantity.textContent = "Quantity";
    labelPrice.textContent = "Price";
    buttonRegisterModal.type = "submit"

    imgUpdateModal.src = imageBottomUpdateModal

    buttonRegisterModal.append(imgUpdateModal)

    bgModal.setAttribute("id", "bgModal");
    form.setAttribute("id", "formModal");
    buttonRegisterModal.setAttribute("id", "btnModalUpdate");

    const removeModal = () => {
        bgModal.remove();
        form.remove();
    };

    bgModal.addEventListener("click", removeModal);
    removeFormAndModal.addEventListener("click", removeModal);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const table = document.querySelector("table");

        const valueName = inputName.value;
        const valueCategory = inputCategory.value;
        const valueQuantity = inputQuantity.value;
        const valuePrice = inputPrice.value;

        if (
            typeof parseInt(valueQuantity) !== "number" ||
            typeof parseInt(valuePrice) !== "number"
        ) {
            alert("These fields are just numbers!");
        }

        const {
            buttonDelete,
            tbody,
            tdName,
            tdCategory,
            tdQuantity,
            tdPrice,
            tdAvailability,
            imgUpdate,
            buttonUpdateOpenModal,
            imgDelete
        } = createTableRow();

        let maxId = 0

        const maxIdNewArray = Math.max(...newArray.map((prod) => prod.id))

        if (maxIdNewArray === -Infinity) {
            maxId = Math.max(...arrayStock.map((prod) => prod.id))
        } else {
            maxId = maxIdNewArray
        }

        imgUpdate.src = imageUpdateProduct;
        imgDelete.src = imageDeleteProduct;

        buttonDelete.append(imgDelete)
        buttonUpdateOpenModal.append(imgUpdate);

        tdPrice.textContent = `${valuePrice}`;
        tdName.textContent = `${valueName}`;
        tdCategory.textContent = `${valueCategory}`;
        tdQuantity.textContent = `${valueQuantity}`;
        tdAvailability.textContent = true;

        const dataRegisterProduct = {
            name: valueName,
            category: valueCategory,
            quantity: valueQuantity,
            price: valuePrice,
            availability: true,
            id: maxId + 1
        };

        newArray.push(dataRegisterProduct);

        alert("Product successfully registered!")

        buttonUpdateOpenModal.addEventListener("click", () => {

            const {
                inputPrice,
                bgModal,
                form,
                inputCategory,
                inputName,
                inputQuantity,
                labelName,
                labelCategory,
                labelQuantity,
                labelPrice,
                buttonUpdateModal,
                imgUpdateModal
            } = createModal();


            inputName.defaultValue = `${dataRegisterProduct.name}`;
            inputQuantity.defaultValue = `${dataRegisterProduct.quantity}`;
            inputCategory.defaultValue = `${dataRegisterProduct.category}`;

            const responseFormattedPrice = formattedPrice(dataRegisterProduct.price);
            inputPrice.defaultValue = responseFormattedPrice;

            labelName.textContent = "Name";
            labelCategory.textContent = "Category";
            labelQuantity.textContent = "Quantity";
            labelPrice.textContent = "Price";
            imgUpdateModal.src = imageBottomUpdateModal

            buttonUpdateModal.append(imgUpdateModal)

            bgModal.setAttribute("id", "bgModal");
            form.setAttribute("id", "formModal");
            buttonUpdateModal.setAttribute("id", "btnModalUpdate");

            const removeModal = () => {
                bgModal.remove();
                form.remove();
            };

            bgModal.addEventListener("click", removeModal);

            form.addEventListener("submit", (e) => {
                e.preventDefault();

                const valueName = inputName.value;
                const valueCategory = inputCategory.value;
                const valueQuantity = inputQuantity.value;
                const valuePrice = inputPrice.value;

                const valueQuantityFormatted = parseInt(valueQuantity);
                const valuePriceFormattedString = valuePrice.replace("R$", "");
                const valuePriceFormattedNumber = parseInt(valuePriceFormattedString);

                const resultUpdateModel = updateProduct({
                    id: dataRegisterProduct.id,
                    valueName,
                    valueCategory,
                    valueQuantityFormatted,
                    valuePriceFormattedNumber,
                    valueQuantityFormatted
                });

                const {
                    category,
                    quantity,
                    name,
                    price,
                    availability
                } = resultUpdateModel;

                const responseFormattedPrice = formattedPrice(price);

                tdPrice.textContent = responseFormattedPrice;
                tdName.textContent = name;
                tdCategory.textContent = category;
                tdQuantity.textContent = quantity;
                tdAvailability.textContent = availability;

                tbody.append(
                    tdName,
                    tdCategory,
                    tdQuantity,
                    tdPrice,
                    tdAvailability,
                    buttonUpdateOpenModal,
                    buttonDelete
                );

                table.append(tbody);
                divTable.append(table);
                sectionHtml.append(divTable);

                removeModal();

                alert("Product has been updated successfully!");
            });

            form.append(
                labelName,
                inputName,
                labelCategory,
                inputCategory,
                labelQuantity,
                inputQuantity,
                labelPrice,
                inputPrice,
                buttonUpdateModal
            );

            bodyHtml.append(form);
            bodyHtml.append(bgModal);
        });

        tbody.id = dataRegisterProduct.id;
        buttonDelete.id = dataRegisterProduct.id;
        buttonDelete.className = "btnDelete";


        buttonDelete.addEventListener("click", (e) => {
            newArray.splice(newArray.findIndex((item) => item.id === dataRegisterProduct.id), 1);
            tbody.remove();
        });

        tbody.append(
            tdName,
            tdCategory,
            tdQuantity,
            tdPrice,
            tdAvailability,
            buttonUpdateOpenModal,
            buttonDelete
        );
        table.append(tbody);

        removeModal();
    });

    form.append(
        labelName,
        inputName,
        labelCategory,
        inputCategory,
        labelQuantity,
        inputQuantity,
        labelPrice,
        inputPrice,
        buttonRegisterModal,
        removeFormAndModal
    );

    bodyHtml.append(form);
    bodyHtml.append(bgModal);

});


