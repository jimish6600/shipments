const express = require('express')
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config()

const app = express()

app.get("/",(req,res)=>{
    res.send("jimish");
})

const PORT = 8080;

app.use(cors())
app.use(express.json())
connectDB();

app.listen(PORT,()=>{
    console.log(`Server is runing${PORT}`)
})