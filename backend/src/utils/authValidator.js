export const isValidPassword = (password) =>{
    return /^[A-Za-z0-9@#$%^&*_!]{6,20}$/.test(password)
}

export const isValidUsername = (username) =>{
    return /^[a-z0-9_]{4,15}$/.test(username)
}

export const isValidEmail = (email)=>{
    return /^\S+@\S+\.\S+$/.test(email);
}