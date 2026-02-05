const Service = require('../models/Service');

// Get all services
const getAllServices = async (req, res)=>{
    try{
        // Find all services
        const services = await Service.find({});
        
        // Response with the service even with empty array
        res.status(200).json({success: true, services})
    }catch(err){
        console.log("Error found in the get all services", err);
        res.status(500).json({success: false, msg: "Error occured inside the server"});
    }
}

// Add one service at time
const addService = async (req, res)=>{
    console.log("Hello")
    try{
        // Get the service name, desciption and image(icon)
        const {name, description, icon} = req.body;
        console.log(name);

        // Create one service based on the name, service and icon
        const service = await Service.create({name, description, icon});

        res.status(201).json({success: true, msg: "Services is created successfully", service});
    }catch(err){
        console.log("Error occured while adding the service");
        res.status(500).json({success: false, msg: "Error occured inside server"});
    }
}

module.exports = {addService, getAllServices};