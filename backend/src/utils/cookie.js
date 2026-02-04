const { NODE_ENV } = require("../config/env")

// Store the cookie for future so that loggin is not needed everytime
const setAuthCookie = (res, token)=>{
    res.cookie("token", token, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: NODE_ENV === "production"? "none":"lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
}

// Clear the cookie from the browser
const clearAuthCookie = (res)=>{
    res.clearCookie("token", {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: NODE_ENV === "production"? "none":"lax",
    });
}


module.exports = {setAuthCookie, clearAuthCookie};