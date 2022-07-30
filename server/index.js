const express = require("express")
var mysql = require("mysql2");
const dotenv = require("dotenv");

const app = express();
dotenv.config()
const config = process.env;

db = mysql.createConnection({
    user: config.DB_USER,
    host: config.DB_HOST,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
  });

const port = 5000

app.get("/",(req,res)=>{
    res.send("server is up and running");
})

app.listen(port,()=>{
    console.log(`listeing on port ${port}`);
})