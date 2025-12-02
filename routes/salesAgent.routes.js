const express = require("express")
const router = express.Router();
const {createSalesAgent,getSalesAgent,getSalesAgentById} = require("../controller/salesAgent.controller")

//create router
router.post("/",createSalesAgent);

//get router
router.get("/",getSalesAgent)
//get by id router
router.get("/:id",getSalesAgentById)

module.exports = router