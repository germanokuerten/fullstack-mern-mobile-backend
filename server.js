//////////////////////////////////////////
// Fullstack Mern Mobile - Backend
//////////////////////////////////////////

// Setup Dependencies
require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")

const app = express()

// Setup Middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json)


