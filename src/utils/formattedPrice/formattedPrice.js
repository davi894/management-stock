const formattedPrice = (price) => {

    const formattedPrice = price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return formattedPrice;
}

export default formattedPrice