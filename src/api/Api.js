import axios from 'axios';

export async function productsData() {
    const products = await axios.get('https://api.rapidmock.com/mocks/wiFMC')
    console.log(products)
    return products
}   