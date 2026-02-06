
// Validate middleware to validate schema like password, userId, etc
const validate = (schema)=>{
    return (req, res, next)=>{
        const {errors} = schema.validate(req.body);

        // If anything not complient with the joi schema
        if(errors){
            res.status(400).json({
                success: false,
                errors: errors.details.map(e=>e.message)
            })
            return;
        }
        
        // pass control to next middleware
        next();

    }
}

module.exports = {validate}