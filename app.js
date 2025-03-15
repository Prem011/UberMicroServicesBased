const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const {connectToDb} = require("./db/db")
connectToDb()
const morgan = require("morgan")
const userRoutes = require("./routes/user.routes")
const captainRoutes = require("./routes/captain.routes")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(morgan("dev"))
app.use(cookieParser())

app.use("/api/users", userRoutes)
app.use("/api/captains", captainRoutes)

module.exports = app