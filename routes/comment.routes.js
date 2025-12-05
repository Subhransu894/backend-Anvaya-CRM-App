const express = require("express")
const router = express.Router();
const {createComment,getAllComments,getCommentsByLeadId}=require("../controller/comments.controller")

//create a new comment
router.post("/",createComment)

//get all comments
router.get("/",getAllComments)

//get by leadId
router.get("/lead/:id",getCommentsByLeadId)
module.exports = router;