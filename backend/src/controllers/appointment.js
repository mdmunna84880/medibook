const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");

// Book an appointment
const bookAppointment = async (req, res) => {
  try {
    const userId = req.user.userId;
    // Extracted the appointment data
    const { doctorId, appointmentAt, comments, report, status } = req.body;
    // Save the appointment data
    const appointment = await Appointment.create({
      userId,
      doctorId,
      appointmentAt,
      comments,
      report,
      status,
    });
    // Send the response with the appoinment data
    res.status(201).json({ success: true, appointment });
  } catch (err) {
    console.log("Error occured inside the bookAppointment", err);
    res
      .status(500)
      .json({ success: false, msg: "Error occured inside the server" });
  }
};

// Get all appointment
const getUserAllAppointment = async (req, res) => {
  try {
    // Extract userId from the isLogin
    const userId = req.user.userId;
    // Extract year from the query
    const { year } = req.query;
    // Query to find in the db
    const query = { userId: new mongoose.Types.ObjectId(userId) };
    // If there is year then find based on year
    if (year) {
      const startingYear = new Date(`${year}-01-01T00:00:00.000Z`);
      const endingYear = new Date(`${year}-12-31T23:59:59.999Z`);
      // Adding the year to sort
      query.appointmentAt = {
        $gte: startingYear,
        $lte: endingYear,
      };
    }
    // Finding all appointment based on userId and year(if available),
    //  and populating userId, doctorId for specific information
    const appointments = await Appointment.find(query)
      .populate("userId", "name email phone")
      .populate("doctorId", "name department rating experience")
      .sort({ appointmentAt: -1 });
    // Response with appointment details even with empty array
    res.status(200).json({ success: true, appointments });
  } catch (err) {
    console.log("Error occured inside get all appoinment", err);
    res
      .status(500)
      .json({ success: false, msg: "Error occured inside the server" });
  }
};

const getDistinctYear = async (req, res) => {
  try {
    // Using aggregation to take only the year and id field
    const yearsWithId = await Appointment.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.user.userId),
        },
      },
      {
        $sort: {
          appointmentAt: -1,
        },
      },
      {
        $project: {
          _id: 1,
          year: { $year: "$appointmentAt" },
        },
      },
      {
        $group: {
          _id: "$year",
          id: { $first: "$_id" },
        },
      },
      {
        $project: {
          year: "$_id",
          id: 1,
          _id: 0,
        },
      },
    ]);
    // Response wiht year and Id even with empty []
    res.status(200).json({ success: true, yearsWithId });
  } catch (err) {
    console.log("Error occured inside the getDistinctYear", err);
    res
      .status(500)
      .json({ success: true, msg: "Error occured inside the Server" });
  }
};

module.exports = { getUserAllAppointment, bookAppointment, getDistinctYear };
