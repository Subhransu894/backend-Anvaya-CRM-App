const Lead = require("../models/lead.models")

//create lead
exports.createLead = async(req,res)=>{
    try {
        const{name,source,salesAgent,status,tags,timeToClose,priority}=req.body;
        if(!name || name.trim() === "" ||
            !source || source.trim() === "" ||
            !salesAgent ||
            !status || status.trim() === "" ||
            !Array.isArray(tags) || tags.length === 0 ||
            timeToClose === undefined || timeToClose === null ||
            priority === undefined || priority === null || priority.trim() === ""){
            return res.status(404).json({message:"All fields (name,source,salesAgent,status,tags,timeToClose,priority) required"})
        }
        const lead = new Lead({
            name,source,salesAgent,status,tags,timeToClose,priority
        })
        // console.log("Lead",lead)
        await lead.save()
        return res.status(201).json({lead})
    } catch (error) {
        console.log("Error creating lead",error)
        res.status(500).json({message:"server error",error:error.message})
    }
}

//get all leads
exports.getAllLeads= async(req,res)=>{
    try {
        const lead = await Lead.find();
        res.status(201).json({lead})
    } catch (error) {
        res.status(500).json({message:"Server Error",error:error.message})
    }
}

//get leads by id
exports.getLeadById = async(req,res)=>{
    try {
        const {id} = req.params;
        const lead = await Lead.findById(id)
        if(!lead){
            return res.status(404).json({message:"Lead can't found"})
        }
        res.status(201).json({lead})
    } catch (error) {
        res.status(500).json({message:"Server Error",error:error.message})
    }
}

//update a lead 
exports.updateLead = async(req,res)=>{
    try {
        const leadId = req.params.id
        const update = req.body

        const updatedLead = await Lead.findByIdAndUpdate(leadId,update,{new:true})
        if(!updatedLead){
           return res.status(404).json({message:"Lead not found"})
        }
        return res.status(201).json({lead: updatedLead})
    } catch (error) {
        return res.status(500).json({message:"Server Error",error:error.message})
    }
}

//Delete a lead
exports.deleteLead = async(req,res)=>{
    try {
        const leadId = req.params.id
        const deleteId = await Lead.findByIdAndDelete(leadId);

        if(!deleteId){
            return res.status(404).json({message:`lead with ID ${leadId} not found`})
        }
        return res.status(200).json({message:"Lead deleted successfully"})
    } catch (error) {
        return res.status(500).json({message:"Server Error",error:error.message})
    }
}