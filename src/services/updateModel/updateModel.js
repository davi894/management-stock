const updateProduct  = ({ id, valueName, valueCategory, valueQuantityFormatted, valuePriceFormattedNumber }) => {
    
    if (valueQuantityFormatted >= 0 && valuePriceFormattedNumber >= 0) {

        const dataUpdateProduct = {
            id: id,
            name: valueName,
            category: valueCategory,
            quantity: valueQuantityFormatted,
            price: valuePriceFormattedNumber,
            availability: valueQuantityFormatted === 0 ? false : true,
        }

        return dataUpdateProduct

    }

};

export default updateProduct 