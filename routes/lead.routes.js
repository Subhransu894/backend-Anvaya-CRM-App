const express = require("express")
const router = express.Router()
const{createLead,getAllLeads,getLeadById,updateLead,deleteLead}=require("../controller/lead.controller")

//post create lead
router.post("/",createLead)

//get methos to get all lead
router.get("/",getAllLeads)

//get lead by id
router.get("/:id",getLeadById)

//update lead by id
router.post("/update/:id",updateLead)

//delete a lead
router.delete("/:id",deleteLead)

module.exports = router;