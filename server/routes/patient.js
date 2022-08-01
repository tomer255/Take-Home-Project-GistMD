const express = require("express");
const router = express.Router();

const {getPatients,addPatient,deletePatient,editPatient} = require("../controllers/patient");


router.get("/getPatients", getPatients);
router.post("/addPatient", addPatient);
router.post("/deletePatient", deletePatient);
router.post("/editPatient", editPatient);

module.exports = router;