const express = require("express")
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");
const {sqlHandler} = require("./sqlHandler")
const patientRoutes = require('./routes/patient');
const fieldsRoutes = require('./routes/fields');


const app = express();
dotenv.config()
const config = process.env;

db = mysql.createConnection({
    user: config.DB_USER,
    host: config.DB_HOST,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
});

const port = config.PORT | 5000

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("server is up and running");
})

app.use("/patient", patientRoutes);
app.use("/fields", fieldsRoutes);

sqlHandler(()=>{
    app.listen(port,()=>{
        console.log(`listeing on port ${port}`);
    })
})
