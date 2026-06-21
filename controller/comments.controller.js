const Comment = require("../models/comment.models")

//add a comment
exports.createComment = async(req,res)=>{
    try {
        const {lead,commentText}=req.body;

        if(!lead  || !commentText || commentText.trim()===""){
            return res.status(404).json({message:"lead  and commentText are. required"})
        }

        const newComment = new Comment({lead,author:req.user.id,commentText})
        await newComment.save()

        res.status(201).json({ message: "Comment created successfully",comment:newComment})
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

//get comment by leadId
exports.getCommentsByLeadId = async(req,res)=>{
    try {
        const {id}=req.params;
        const comments = await Comment.find({lead: id}).populate("author","name email");
        res.status(200).json({comments})
    } catch (error) {
        res.status(500).json({message:"Server Error",error:error.message})
    }
}