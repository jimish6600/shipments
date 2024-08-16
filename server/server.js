const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRouter = require('./router/auth.router');
require('dotenv').config()

const app = express()

app.get("/",(req,res)=>{
    res.send("jimish backend is working");
})

const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/auth', authRouter);
connectDB();

app.listen(PORT,()=>{
    console.log(`Server is runing${PORT}`)
})