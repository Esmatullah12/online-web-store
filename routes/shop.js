const express = require('express')
const path = require('path')
const router = express.Router()
const shopController = require('../controllers/products')

router.get("/", shopController.getIndex)

router.get("/products", shopController.getProducts)

router.get("/products/:productId", shopController.getProduct)

router.get("/checkout", shopController.getCheckout)

router.get('/cart', shopController.getCart)

router.post('/cart', shopController.postCart)

router.post('/cart-delete-item', shopController.postDeleteCartProduct)

router.get('/orders', shopController.getOrders)

module.exports = router