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
app.use(express.json())

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

// Routes
// IDUCS

// Test Route
app.get("/", (req, res) => {
    res.send("App is active")
})

// Index
app.get("/restaurants", async (req, res) => {
    try {
        // get all restaurants from database
        res.json(await Restaurant.find({}))
    } catch (error){
        // send error to user
        res.status(400).json(error)
    }
})

// Delete
app.delete("/restaurants/:id", async (req, res) => {
    try {
        res.json(await Restaurant.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
})

// Update
app.put("/restaurants/:id", async (req, res) => {
    try {
        res.json(await Restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true}))
    } catch (error) {
        res.status(400).json(error)
    }
})

// Create
app.post("/restaurants", async (req, res) => {
    try {
        res.json(await Restaurant.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
})

// Show
app.get("/restaurants/:id", async (req, res) => {
    try {
        res.json(await Restaurant.findById(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
})

// Listener
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})