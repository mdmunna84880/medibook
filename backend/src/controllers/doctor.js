const Doctor = require('../models/Doctor');

const getAllDepartment = async (req, res)=>{
    try{
        // Find all doctors
        const department = await Doctor.find({}, {department: 1});
        // If there is no doctor
        if(department.length === 0){
            res.status(404).json({success: false, msg: "No department available, so no doctor"});
            return;
        }

        // Response with all the department
        res.status(200).json({success: true, department});

    }catch(err){
        console.log("Error occured inside the getAllDepartment", err);
        res.status(500).json({success: false, msg: "Error occured inside server"});
    }
}

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