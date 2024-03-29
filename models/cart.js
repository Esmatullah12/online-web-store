const fs  = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json')

 
module.exports = class Cart {
    static addProduct(productId, productPrice){
        // Fetch the previous cart
        fs.readFile( p, (err, FileContent) => {
            let cart = {products: [], totalPrice: 0}
            if (!err){
                cart = JSON.parse(FileContent)
            }
            // Anaylze the cart => Find the existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === productId)
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct;
            // Add new product / increase the quantity
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct
            } else {
                updatedProduct = {id: productId, qty: 1}
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + +productPrice
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err)
            } )
        })        
    }
    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if(err){
                return
            }
            const updatedCart = {...JSON.parse(fileContent)}
            const product = updatedCart.products.find(prod => prod.id === id)
            // if(!product){
            //     return
            // }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
            updatedCart.totalPrice = updatedCart.totalPrice - productQty * productPrice;
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err)
            } )

        })
    }
    static getCart(cb){
        fs.readFile(p, (err, fileContent) =>{
            const cart = JSON.parse(fileContent)
            if(err){
                cb(null)
            } else {
                cb(cart)
            }
        })
    }
}