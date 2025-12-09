const express = require("express")
const router = express.Router()
const {getClosedAndPipeline,getClosedByAgent,getStatusDistributions}=require("../controller/report.controller")

//closed and pipline
router.get("/closed-pipeline",getClosedAndPipeline)

//closed by agents
router.get("/closed-by-agents",getClosedByAgent)

//statuss distribution
router.get("/status-distribution",getStatusDistributions)

module.exports = router;