const mongoose = require('mongoose')
require('dotenv').config()

const mongoURL = process.env.MONGODB;

const initializeDatabse = async()=>{
   await mongoose.connect(mongoURL).then(()=>{
        console.log("Connected to DB Successful")
   }).catch((error)=>console.log("Error to connect to DB",error))
}
module.exports = {initializeDatabse}