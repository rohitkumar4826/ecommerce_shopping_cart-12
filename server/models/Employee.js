const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    email:String,
    password:String,
    cpassword:String
})

const EmployeeModel =mongoose.model("Profile",EmployeeSchema)
module.exports = EmployeeModel
