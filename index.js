const express = require("express")
const app = express()

const cors = require("cors")
const corOption = {
    origin:"*",
    credentials:true,
}

const {initializeDatabse} = require("./db/db.connect")

app.use(express.json())
app.use(cors(corOption))

initializeDatabse()

//testing
app.get("/",(req,res)=>{
    res.send("server is connected")
})

//saleagent router
const salesAgentRoute = require("./routes/salesAgent.routes")
app.use("/api/sales-agents",salesAgentRoute)

//lead router
const leadRoute = require("./routes/lead.routes")
app.use("/api/leads",leadRoute)

//comment router
const commentRoute = require("./routes/comment.routes")
app.use("/api/comments",commentRoute)

//report router
const reportRoute = require("./routes/reportRoute")
app.use("/api/reports",reportRoute)
const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})