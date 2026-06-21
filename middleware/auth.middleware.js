const jwt = require("jsonwebtoken")
const authMiddleware = async(req,res,next)=>{
    try {
        const authHeader = req.header("Authorization")
        if(!authHeader){
            return res.status(401).json({message:"Access denied. No token provided"})
        }
        const token = authHeader.replace("Bearer ","")
        const decoded = jwt.verify(
            token,process.env.JWT_SECRET
        ) 
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({message:"Invalid Token",error})
    }
}
module.exports = authMiddleware