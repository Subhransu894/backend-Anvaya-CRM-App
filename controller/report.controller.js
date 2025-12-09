const Lead = require("../models/lead.models")
const SalesAgent = require("../models/salesAgent.models")

//total leads closed + pipeline
exports.getClosedAndPipeline=async(req,res)=>{
    try {
        const closed = await Lead.countDocuments({status:"Closed"})

        const pipeline = await Lead.countDocuments({
            status:{$ne:"Closed"}
        })
        res.json({
            closed,
            pipeline
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//leads closed by saleagent
exports.getClosedByAgent=async(req,res)=>{
    try {
        const data = await Lead.aggregate([
            {$match:{status:"Closed"}},
            {
                $group:{
                    _id:"$salesAgent",
                    totalClosed:{$sum:1}
                }
            },
            //join to get agent name
            {
                $lookup:{
                    from:"salesagents",
                    localField:"_id",
                    foreignField:"_id",
                    as:"agent"
                }
            },
            {$unwind:"$agent"},
            {
                $project:{
                    agentName:"$agent.name",
                    totalClosed: 1,
                    _id:0
                }
            },
        ]);
        res.json(data)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
//lead status distribution
exports.getStatusDistributions=async(req,res)=>{
    try {
        const data = await Lead.aggregate([
            {
                $group:{
                    _id:"$status",
                    count:{$sum:1},
                }
            },
            {
                $project:{
                    status:"$_id",
                    count: 1,
                    _id:0
                }
            }
        ]);
        res.json(data)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}