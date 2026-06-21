const SalesAgent = require("../models/salesAgent.models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = async(req,res)=>{
    try {
        const {name,email,password}=req.body
        const existingUser = await SalesAgent.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password,10)

        const salesAgent = await SalesAgent.create({
            name,email,password: hashedPassword,
        })
        
        res.status(200).json({message:"User register successfully",salesAgent})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const login = async(req,res)=>{
    try {
        const {email,password} = req.body
        const salesAgent = await SalesAgent.findOne({email})

        if(!salesAgent){
            return res.status(400).json({message:"Invalid email or password"})
        }

        const isMatch = await bcrypt.compare(password,salesAgent.password)

        if(!isMatch){
            return res.status(400).json({message:"Invalid email or password"})
        }
        const token = jwt.sign(
            {id: salesAgent._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )
        res.status(200).json({message:"Login Successful",token})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
module.exports = {register,login}