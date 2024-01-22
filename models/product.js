const Cart = require('./cart');
const db = require('../util/db')

module.exports = class Product {
    constructor(title, imageUrl, price, description, id){
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
        this.id = id
    }
    save(){
        return db.execute("INSERT INTO products (title, price, description, imageUrl) VALUES(?, ?, ?, ?)",[this.title, this.price, this.description, this.imageUrl]) 
    }

    static deleteById(id){
        
    }

    static fetchAll(){
        return db.execute("SELECT * FROM products")
    }

    static findById(id) {
        return db.execute('SELECT * FROM products WHERE id = ?',[id])
    }
}