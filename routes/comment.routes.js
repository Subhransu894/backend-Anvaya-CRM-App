const express = require("express")
const router = express.Router();
const {createComment,getAllComments}=require("../controller/comments.controller")

//create a new comment
router.post("/",createComment)

//get all comments
router.get("/",getAllComments)
module.exports = router;