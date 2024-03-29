const Product = require('../models/product')


exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
            pageTitle: "Admin panel",
            path: "/admin/add-product",
            enableEdit: false
        }
    )
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products =>{
        res.render('admin/products', {prods: products, pageTitle: 'Admin Products', path: "/admin/products"})
    })
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    const product = new Product(req.body.title, req.body.imageUrl, req.body.price, req.body.description)
    product
        .save()
        .then(() => {
            res.redirect("/")
        })
        .catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit
    if(!editMode) {
        res.redirect("/")
    }
    const productId = req.params.productId
    Product.findById(productId, product => {
        if(!product){
            res.redirect('/')
        }
        res.render("admin/edit-product", {
            pageTitle: "Admin panel",
            path: "/admin/edit-product",
            enableEdit: editMode,
            product: product
        })
    })
}

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedProduct = new Product(updatedTitle, updatedImageUrl, updatedPrice, updatedDescription, productId)
    updatedProduct.save()
    res.redirect('/admin/products')
}

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId
    Product.deleteById(productId)
    res.redirect("/")
}

