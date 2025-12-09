const express = require("express")
const router = express.Router();
const {createSalesAgent,getSalesAgent,getSalesAgentById,deleteAgent} = require("../controller/salesAgent.controller")

//create router
router.post("/",createSalesAgent);

//get router
router.get("/",getSalesAgent)
//get by id router
router.get("/:id",getSalesAgentById)

//delete by saleagent
router.delete("/:id",deleteAgent)

module.exports = router