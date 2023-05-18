import imageUpdateProduct from "./src/assets/links/imageUpdateProduct.js";
import { createModal, createTableRow } from "./src/components/index.js";
import { formattedPrice, setIdsAndSortPrice, } from "./src/utils/index.js";
import stock from "./src/database/stock.js";
import { bodyHtml, btnRegisterProd, divTable, keysStock, sectionHtml } from "./src/global/variables/variables.js";
import { updateModel } from "./src/services/index.js";

btnRegisterProd.addEventListener("click", () => {

    const {
        inputPrice,
        bgModal, form,
        inputCategory, inputName,
        inputQuantity,
        labelName,
        labelCategory,
        labelQuantity,
        labelPrice,
        buttonRegisterModal,
    } = createModal()

    const removeFormAndModal = document.createElement("span");

    inputName.defaultValue = ``;
    inputQuantity.defaultValue = ``;
    inputCategory.defaultValue = ``;
    inputPrice.defaultValue = ``

    labelName.innerText = "Name";
    labelCategory.innerText = "Category";
    labelQuantity.innerText = "Quantity";
    labelPrice.innerText = "Price";
    removeFormAndModal.innerText = "X";

    buttonRegisterModal.innerText = "Register product";

    bgModal.setAttribute("id", "bgModal");
    removeFormAndModal.setAttribute("id", "btnRemoveFormAndModal");
    buttonRegisterModal.setAttribute("id", "btnModalUpdate");

    const removeModal = () => {
        bgModal.remove();
        form.remove();
    };

    bgModal.addEventListener("click", removeModal);
    removeFormAndModal.addEventListener("click", removeModal);

    form.append(
        labelName, inputName,
        labelCategory, inputCategory,
        labelQuantity, inputQuantity,
        labelPrice, inputPrice,
        buttonRegisterModal,
        removeFormAndModal
    );

    form.addEventListener("submit", (e) => {
        e.preventDefault()

        const table = document.querySelector("table")

        const valueName = inputName.value
        const valueCategory = inputCategory.value
        const valueQuantity = inputQuantity.value
        const valuePrice = inputPrice.value

        if (typeof parseInt(valueQuantity) !== "number" || typeof parseInt(valuePrice) !== "number") {
            alert("These fields are just numbers!")
        }

        const {
            buttonDelete,
            tbody, tdName,
            tdCategory, tdQuantity,
            tdPrice, tdAvailability,
            img, buttonUpdateOpenModal
        } = createTableRow();

        const arrayStock = setIdsAndSortPrice(stock)

        const maxId = Math.max(...arrayStock.map(prod => prod.id));

        img.src = imageUpdateProduct;
        buttonDelete.innerText = "delete";
        buttonUpdateOpenModal.append(img);

        const responseFormattedPrice = formattedPrice(parseInt(valuePrice));

        tdPrice.innerText = `${responseFormattedPrice}`;
        tdName.innerText = `${valueName}`;
        tdCategory.innerText = `${valueCategory}`;
        tdQuantity.innerText = `${valueQuantity}`;
        tdAvailability.innerText = true;

        const dataRegisterProduct = {
            "id": maxId + 1,
            'name': valueName,
            'category': valueCategory,
            'quantity': valueQuantity,
            'price': responseFormattedPrice,
            'availability': true
        }

        stock.push(dataRegisterProduct)


        tbody.append(tdName, tdCategory, tdQuantity, tdPrice, tdAvailability, buttonUpdateOpenModal, buttonDelete);
        table.append(tbody);


        alert("Product has been register successfully!!")
        
        removeModal()

        localStorage.removeItem("arrayStock")

        const arrayStockNew = setIdsAndSortPrice([...arrayStock, dataRegisterProduct])

        localStorage.setItem("arrayStock", JSON.stringify(arrayStockNew))

    })

    bodyHtml.append(form);
    bodyHtml.append(bgModal);
})


const createTable = () => {

    const table = document.createElement("table");
    const thead = document.createElement("thead");

    keysStock.forEach((e) => {
        const th = document.createElement("th");
        th.innerText = e;
        thead.append(th);
    });

    table.append(thead);

    const arrayStock = setIdsAndSortPrice(stock)

    localStorage.setItem("arrayStock", JSON.stringify(arrayStock))

    JSON.parse(localStorage.getItem("arrayStock")).forEach(({ name, quantity, category, price, availability, id }) => {
        const {
            buttonDelete,
            tbody, tdName,
            tdCategory, tdQuantity,
            tdPrice, tdAvailability,
            img, buttonUpdateOpenModal
        } = createTableRow();
        console.log(id)
        img.src = imageUpdateProduct;
        buttonDelete.innerText = "delete";
        buttonUpdateOpenModal.append(img);

        buttonUpdateOpenModal.addEventListener("click", () => {

            const {
                inputPrice,
                bgModal, form,
                inputCategory, inputName,
                inputQuantity,
                labelName,
                labelCategory,
                labelQuantity,
                labelPrice,
                buttonUpdateModal,
            } = createModal()

            const removeFormAndModal = document.createElement("span");

            inputName.defaultValue = `${name}`;
            inputQuantity.defaultValue = `${quantity}`;
            inputCategory.defaultValue = `${category}`;

            const responseFormattedPrice = formattedPrice(price)

            inputPrice.defaultValue = responseFormattedPrice

            labelName.innerText = "Name";
            labelCategory.innerText = "Category";
            labelQuantity.innerText = "Quantity";
            labelPrice.innerText = "Price";
            removeFormAndModal.innerText = "X";

            buttonUpdateModal.innerText = "update";

            bgModal.setAttribute("id", "bgModal");
            removeFormAndModal.setAttribute("id", "btnRemoveFormAndModal");
            buttonUpdateModal.setAttribute("id", "btnModalUpdate");

            const removeModal = () => {
                bgModal.remove();
                form.remove();
            };

            bgModal.addEventListener("click", removeModal);
            removeFormAndModal.addEventListener("click", removeModal);

            form.addEventListener("submit", () => {

                const valueName = inputName.value
                const valueCategory = inputCategory.value
                const valueQuantity = inputQuantity.value
                const valuePrice = inputPrice.value

                const valueQuantityFormatted = parseInt(valueQuantity)
                const valuePriceFormattedString = valuePrice.replace("R$", "")
                const valuePriceFormattedNumber = parseInt(valuePriceFormattedString)


                const resultUpdateModel = updateModel({
                    id,
                    valueName,
                    valueCategory,
                    valueQuantityFormatted,
                    valuePriceFormattedNumber,
                    valueQuantityFormatted
                })

                const { id, category, quantity, name, price, availability } = resultUpdateModel

                const responseFormattedPrice = formattedPrice(price);

                tdPrice.innerText = responseFormattedPrice;
                tdName.innerText = name;
                tdCategory.innerText = category;
                tdQuantity.innerText = quantity;
                tdAvailability.innerText = availability;

                stock.push(dataUpdateProduct)

                tbody.append(
                    tdName,
                    tdCategory,
                    tdQuantity,
                    tdPrice,
                    tdAvailability,
                    buttonUpdateOpenModal,
                    buttonDelete
                )

                table.append(tbody);
                divTable.append(table);
                sectionHtml.append(divTable);

                removeModal()
                alert("Product has been updated successfully!");

            })

            form.append(
                labelName, inputName,
                labelCategory, inputCategory,
                labelQuantity, inputQuantity,
                labelPrice, inputPrice,
                buttonUpdateModal,
                removeFormAndModal
            );

            bodyHtml.append(form);
            bodyHtml.append(bgModal);
        });

        buttonDelete.addEventListener("click", () => {
            JSON.parse(localStorage.getItem("arrayStock")).splice(id, 1)
            console.log(id)
            tbody.remove()
        })

        const responseFormattedPrice = formattedPrice(price);

        tdPrice.innerText = responseFormattedPrice;
        tdName.innerText = name;
        tdCategory.innerText = category;
        tdQuantity.innerText = quantity;
        tdAvailability.innerText = availability;

        tbody.append(tdName, tdCategory, tdQuantity, tdPrice, tdAvailability, buttonUpdateOpenModal, buttonDelete);
        table.append(tbody);
    });

    divTable.append(table);
    sectionHtml.append(divTable);
};



createTable();


