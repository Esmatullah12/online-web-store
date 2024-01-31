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
    Product.findAll()
        .then(products => {
            res.render('admin/products', {prods: products, pageTitle: "Admin Products", path: "/admin/products"})
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    Product.create({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
    }).then(result => console.log(result)).catch(err => {
        console.log(err)
    })
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit
    if(!editMode) {
        res.redirect("/")
    }
    const productId = req.params.productId
    Product.findAll({where: {id: productId}})
        .then( product => {
            if(!product){
                res.redirect('/')
            }
            res.render("admin/edit-product", {
                pageTitle: "Admin panel",
                path: "/admin/edit-product",
                enableEdit: editMode,
                product: product[0]
            })
        })
        .catch(err => {
            console.log(err)
        })
        
    
}

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    Product.findAll({where: {id: productId}})
        .then(product => {
            product[0].title = updatedTitle;
            product[0].imageUrl = updatedImageUrl;
            product[0].price = updatedPrice;
            product[0].description = updatedDescription
            return product[0].save()
            
        })
        .then(result => {
            console.log("Updated the product")
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId
    Product.deleteById(productId)
    res.redirect("/")
}

