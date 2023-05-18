const setIdsAndSortPrice = (arrayProduct) => {

    let arrayReverse = arrayProduct.sort((a, b) => {
        const priceA = a.price;
        const priceB = b.price;

        if (priceA > priceB) {
            return 1;
        }
        if (priceA < priceB) {
            return -1;
        }

        return 0;
    });

    const newArray = arrayReverse.map((e, id) => ({ ...e, id: id + 1 }));

    return newArray;
};

export default setIdsAndSortPrice