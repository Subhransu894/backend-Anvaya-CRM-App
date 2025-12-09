const SalesAgent = require("../models/salesAgent.models");

//create agent
exports.createSalesAgent = async(req,res)=>{
    try{
        const {name,email}=req.body;

        if(!name || !email){
            return res.status(400).json({meassage:"Name and Email are required"})
        }

        const agent = new SalesAgent({name,email})
        await agent.save();
        return res.status(201).json({agent})
    }catch(error){
        console.log("Error in create of agent",error)
        //email validation check
        if(error.code === 11000){
            return res.status(400).json({message:"Email is already existed"})
        }
        res.status(500).json({message:"Server error", error:error.message})
    }
}
//get sales Agent
exports.getSalesAgent=async(req,res)=>{
    try {
        const agent = await SalesAgent.find()
        res.status(200).json({agent})
    } catch (error) {
        res.status(500).json({message:"Server Error",error})
    }
}

//get by id
exports.getSalesAgentById = async(req,res)=>{
    try {
        const {id}=req.params;
        const agent = await SalesAgent.findById(id)

        if(!agent){
            return res.status(404).json({message:"Sales agent not found"})
        }
        res.status(200).json({agent})
    } catch (error) {
        res.status(500).json({message:"Server Error", error: error.message})
    }
}

//delete by id
exports.deleteAgent = async(req,res)=>{
    try {
        const salesId = req.params.id;
        const deleteId = await SalesAgent.findByIdAndDelete(salesId)
        if(!deleteId){
            res.status(404).json({message:`Agent with ${salesId} not found`})
        }
        res.status(200).json({message:"sales agent delete successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}