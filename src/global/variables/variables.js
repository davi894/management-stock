import stock from "../../database/stock.js";

const bodyHtml = document.querySelector("body");
const sectionHtml = document.querySelector("section");
const divTable = document.querySelector(".tableContainer");
const btnRegisterProd = document.querySelector("#registerProd")
const keysStock = Object.keys(stock[0]);


export { bodyHtml, sectionHtml, divTable, keysStock, btnRegisterProd }