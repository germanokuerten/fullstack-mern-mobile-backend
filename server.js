//////////////////////////////////////////
// Fullstack Mern Mobile - Backend
//////////////////////////////////////////

// Setup Dependencies
require("dotenv").config()

const {PORT = 3334, DATABASE_URL }=process.env
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")

const app = express()

// Setup Middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json)

// Database connection
mongoose.connect(process.env.DATABASE_URL)

mongoose.connection
    .on("open", () => console.log("MongoDB Connected"))
    .on("closed", () => console.log("MongoDB Closed"))
    .on("error", (error) => console.log(error))

// Schema Model
const RestaurantSchema = new mongoose.Schema({
    name: String,
    image: String,
    link: String,
    menu1: String,
    menu2: String,
    menu3: String
})

const Restaurant = mongoose.model("Restaurant", RestaurantSchema)
