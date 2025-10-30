const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

const initializeDatabase=()=>{
    mongoose.connect(mongoUri).then(()=>{
        console.log("Connected to Database successfully");
    }).catch((error)=>console.log("Error connecting to Database",error));
}
module.exports = {initializeDatabase};