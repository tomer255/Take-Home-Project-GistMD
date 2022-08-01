const express = require("express");
const router = express.Router();

const {getFields} = require("../controllers/fields");


router.get("/getFields", getFields);

module.exports = router;