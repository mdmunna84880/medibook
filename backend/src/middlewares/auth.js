const jwt = require('jsonwebtoken');
const env = require('../config/env')

// See whether the user logged in or not
const protect = (req, res, next) =>{
    try{
        // Get token from the request
        const token = req.cookies?.token;

        // No token means, not logged in
        if(!token){
            res.status(401).json({success: false, msg: "Not authorized, token is missing"});
        }

        // Verify and provide the data that we have converted into JWT earlier
        const decoded = jwt.verify(token, env.JWT_SECRET);
        
        // Attaching the userId and authprovider to req.user
        req.user = {
            userId: decoded.userId,
            authProvider: decoded.authProvider
        }

        next();
    }catch(err){
        
        console.log("Error happened in the AuthMiddleware:\n", err);
        res.status(401).json({success: false, msg: "Not authorized, wrong token"});
        return;
    }
}

module.exports = {protect}