const express = require("express")
const router = express.Router();
const {createComment,getAllComments,getCommentsByLeadId}=require("../controller/comments.controller")
const authMiddleware = require("../middleware/auth.middleware")

//create a new comment
router.post("/",authMiddleware,createComment)

//get all comments
router.get("/",authMiddleware,getAllComments)

//get by leadId
router.get("/lead/:id",authMiddleware,getCommentsByLeadId)
module.exports = router;