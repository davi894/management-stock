const createTableRow = () => {
    const tbody = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdCategory = document.createElement("td");
    const tdQuantity = document.createElement("td");
    const tdPrice = document.createElement("td");
    const tdAvailability = document.createElement("td");
    const img = document.createElement("img");
    const buttonUpdateOpenModal = document.createElement("button");
    const buttonDelete = document.createElement("button");


    return {
        tbody: tbody,
        tdName: tdName,
        tdCategory: tdCategory,
        tdQuantity: tdQuantity,
        tdPrice: tdPrice,
        tdAvailability: tdAvailability,
        img: img,
        buttonUpdateOpenModal: buttonUpdateOpenModal,
        buttonDelete: buttonDelete
    };
};

export default createTableRow