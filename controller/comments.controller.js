const Comment = require("../models/comment.models")

//add a comment
exports.createComment = async(req,res)=>{
    try {
        const {lead,author,commentText}=req.body;

        if(!lead || !author || !commentText || commentText.trim()===""){
            return res.status(404).json({message:"lead author and commentText are. required"})
        }

        const newComment = new Comment({lead,author,commentText})
        await newComment.save()

        res.status(201).json({message:newComment})
    } catch (error) {
        res.status(500).json({message:"Server Error",error:error.message})
    }
}

//read all comments
exports.getAllComments = async(req,res)=>{
    try {
        const comments = await Comment.find().populate("lead", "name") .populate("author", "name email")
        res.status(200).json({comments})
    } catch (error) {
        res.status(500).json({message:"Server Error",error:error.message})
    }
}