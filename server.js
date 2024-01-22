const http = require("http");
const express = require("express")
const bodyParser = require("body-parser")
const pageNotFoundController = require("./controllers/404.js")

const path = require('path')

const adminRoutes = require("./routes/admin")
const shopRouter = require('./routes/shop')

const app = express()
app.set("view engine", "ejs")
app.set("views", "views")
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))

app.use("/admin", adminRoutes)
app.use(shopRouter)

app.use(pageNotFoundController.pageNotFound)

const server = http.createServer(app)

server.listen(3000)
