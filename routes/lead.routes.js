const express = require("express")
const router = express.Router()
const{createLead,getAllLeads,getLeadById,updateLead,deleteLead}=require("../controller/lead.controller")
const authMiddleware = require("../middleware/auth.middleware")

//post create lead
router.post("/",authMiddleware,createLead)

//get methos to get all lead
router.get("/",authMiddleware,getAllLeads)

//get lead by id
router.get("/:id",authMiddleware,getLeadById)

//update lead by id
router.post("/update/:id",authMiddleware,updateLead)

//delete a lead
router.delete("/:id",authMiddleware,deleteLead)

module.exports = router;