const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then(([row, fileData]) => 
    res.render('shop/product-list', {prods: row, pageTitle: 'Shop', path: "/products"}))
    .catch(err => console.log(err))
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product
    .findById(prodId)
    .then(([targetProduct]) => {
        res.render('shop/product-detail', {product: targetProduct[0], pageTitle: targetProduct.title, path: "/products"})
    })
    .catch(err => console.log(err))
       
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
    .then(([row, fileData]) => 
    res.render('shop/product-list', {prods: row, pageTitle: 'Shop', path: "/"}))
    .catch(err => console.log(err))
}


exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = []
            for (product of products){
                const cartProductData = cart.products.find(prod => prod.id === product.id)
                if(cartProductData){
                    cartProducts.push({productData: product, qty: cartProductData.qty})
                }
            }
            res.render("shop/cart", {
                pageTitle: 'Cart',
                path: '/cart',
                products: cartProducts
            })
        })
    })
}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId
    Product.findById(productId, (product) => {
        Cart.addProduct(productId, product.price)
    })
    res.redirect("/cart")
}

exports.postDeleteCartProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, product => {
        Cart.deleteProduct(productId, product.price)
        res.redirect('/cart')
    })
    
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {pageTitle: "Checkout", path: '/checkout'})
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {pageTitle: "Your orders", path: '/orders'})
}