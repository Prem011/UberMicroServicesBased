const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())

app.get("/", (res, req) => {
    res.send("hello")
})

module.exports = app