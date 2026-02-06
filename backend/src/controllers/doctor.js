const Doctor = require('../models/Doctor');

// Get all department
const getAllDepartment = async (req, res)=>{
    try{
        // Find all doctors
        const department = await Doctor.find({}, {department: 1});

        // Response with all the department even with empty array
        res.status(200).json({success: true, department});

    }catch(err){
        console.log("Error occured inside the getAllDepartment", err);
        res.status(500).json({success: false, msg: "Error occured inside server"});
    }
}

// Add doctor
const addDoctor = async (req, res)=>{
    try{
        // Extract all important data
        const {name, department, specialization, experience, rating} = req.body;

        // Add in the DB
        const doctor = await Doctor.create({name, department, specialization, experience, rating});
        // Response with that data
        res.status(201).json({success: true, doctor});
    }catch(err){
        console.log("Error occured inside the doctor", err);
        res.status(500).json({success: false, msg: "Error happened inside the Server"});
    }
}

module.exports = {addDoctor, getAllDepartment};