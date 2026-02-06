const User = require("../models/User");
const bcrypt = require('bcryptjs');
const {generateToken} = require('../utils/jwt');
const {setAuthCookie, clearAuthCookie} = require('../utils/cookie');

// Register controller
const register = async (req, res)=>{
    console.log("Has reached to register route")
    try{
        const {name, email, password} = req.body;

        // Validating the required field
        if(!name || !email ||  !password){
            res.status(400).json({success: false, msg: "Required field are missing."});
            return;
        }

        // Checking the email if it exist
        const existingUser = await User.findOne({email: email.trim()});
        // If user is existing, don't register
        if(existingUser){
            res.status(409).json({success: false, msg: "User is already exist."});
            return;
        }

        // Generating the salt and hashing it
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Save data in DB
        const user = await User.create({name, email, password: hash, authProvider: "local"});
        // Generate the token
        const token = generateToken({userId: user._id, authProvider: user.authProvider});
        // Save the token into cookie
        setAuthCookie(res, token);

        // Send confirmation with user data
        res.status(201)
            .json({
                success: true, 
                msg: "You have registered successfully", 
                user:{
                    id: user._id, 
                    name: user.name, 
                    email: user.email, 
                    authProvider: user.authProvider
                 }
            });

    }catch(err){
        res.status(500).json({success: false, msg: "Error occured inside Server"});
    }
}

// Loging Controller
const login = async (req, res) =>{
    try{
        const {email, password } = req.body;

        if(!email || !password){
            res.status(400).json({success: false, msg: "Required field are missing."});
            return;
        }
        // Find the user
        const user = await User.findOne({email}).select("+password");

        // User don't available in the db
        if(!user){
            res.status(404).json({success: false, msg: "User don't exist"});
            return;
        }
        // User is not using local login and signed with google
        if(user.authProvider !== 'local'){
            res.status(400).json({success: false, msg: "This account uses google login."});
            return;
        }
        // Compare password with db password
        const isMatch = await bcrypt.compare(password, user.password);
        // The user password don't match with db password
        if(!isMatch){
            res.status(401).json({success: false, msg: "Either user email or password is wrong"});
            return;
        }

         // Generate the token
        const token = generateToken({userId: user._id, authProvider: user.authProvider});
        // Save the token into cookie
        setAuthCookie(res, token);

        // Send confirmation with user data
        res.status(200)
            .json({
                success: true, 
                msg: "You have logged successfully", 
                user:{
                    id: user._id, 
                    name: user.name, 
                    email: user.email, 
                    authProvider: user.authProvider
                 }
            });

    }catch(err){
        console.log("Error occured in Login", err);
        res.status(500).json({success: false, msg: "Error occured inside server"});
    }
}

// Log out controller
const logout = (req, res) =>{
    try{
        // Clear cookie
        clearAuthCookie(res);
        res.status(200).json({success: true, msg: "Logged out successfully"})
    }catch(err){
        console.log("Error occured in the Logout", err);
        res.status(500).json({success: false, msg: "Error occured inside server"})
    }
}

// Get user data like name, email, authProvider, avtar, createAt
const getMe = async (req, res)=>{
    try{
        // Getting data from the JWT (middleware)
        const userId = req.user.userId;

        // Querying to get data from DB
        const user = await User.findById(userId).select({
            name: 1,
            email: 1,
            authProvider: 1,
            avatar: 1,
            createdAt: 1
        });

        // User don't exist
        if(!user){
            res.status(404).json({success: false, msg: "User don't exist"});
            return;
        }

        return res.status(200).json({success: true, user});
    }catch(err){
        console.log("Error occured in the getme", err);
        res.json({success: false, msg: "Error occured in the server"});
    }
}

// Google authentication for register and sign in
const googleAuth = async (req, res)=>{
    try{
        const {email, name, avatar, googleId} = req.body;

        // Check both email and google exist
        if(!email || !googleId){
            res.status(400).json({success: false, msg: "Wrong google Id or email"});
            return;
        }

        // Find the user information from the DB
        let user = await User.findOne({email: email.toLowerCase()});

        // Check if the user is already registered with email or password
        if(user && user.authProvider === "local"){
            res.status(400).json({success: false, msg: "This email is registered email and password"});
            return;
        }

        // Keep update the google profile
        if(user){
            user.avatar = avatar;
            await user.save();
        }else{
            // Register the new user
            user = await User.create({name, email: email.toLowerCase(), avatar, googleId, authProvider: "google"});
        }

        // Generate the toaken using JWT
        const token = generateToken({userId: user._id, authProvider: user.authProvider});
        
        // Set the authentication cookie in the browser for future logged automatically
        setAuthCookie(res, token);

        // Response with user data and message
        res.status(200).json({success: true, msg: "Google authentication successful", user: {
            id: user._id,
            name: user.name,
            email: user.email,
            authProvider: user.authProvider,
            avatar: user.avatar
        }});
    }catch(err){
        console.log("Error occured in Google Auth\n", err);
        res.status(500).json({success: false, msg: "Error occured inside the server"});
    }
}

module.exports = {register, login, logout, getMe, googleAuth};