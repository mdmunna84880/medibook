/** @format */

// Validate password function to validate the password and give useful information
export const validatePassword = (password) => {
//   Regex expression for password validation
  const requirements = {
    minLength: password.length >= 8,
    maxLength: password.length <= 16,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasDigit: /\d/.test(password),
    hasSpecial: /[@.#$!%*?&]/.test(password),
    validChars: /^[A-Za-z\d@.#$!%*?&]+$/.test(password),
  };

//   Errors if anything missing that is required
  const errors = [];

  if (!requirements.minLength)
    errors.push("Password must be at least 8 characters long.");

  if (!requirements.maxLength)
    errors.push("Password must not exceed 16 characters.");

  if (!requirements.hasUpper)
    errors.push("Include at least one uppercase letter.");

  if (!requirements.hasLower)
    errors.push("Include at least one lowercase letter.");

  if (!requirements.hasDigit) errors.push("Include at least one number.");

  if (!requirements.hasSpecial)
    errors.push("Include at least one special character (@.#$!%*?&).");

  if (!requirements.validChars) errors.push("Contains invalid characters.");

  return {
    isValid: errors.length === 0,
    errors,
    message: errors.length ? errors.join(" ") : "Password is valid."
  };
};

// Validate email function to validate and give information
export const validateEmail = (email = "") => {
//   All requirement for the email
  const requirements = {
    notEmpty: email.length > 0,
    hasAtSymbol: email.includes("@"),
    validStructure: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email),
    noSpaces: !/\s/.test(email),
  };

//   Store all errors
  const errors = [];

  if (!requirements.notEmpty)
    errors.push("Email is required.");

  if (!requirements.noSpaces)
    errors.push("Email must not contain spaces.");

  if (!requirements.hasAtSymbol)
    errors.push("Email must contain '@' symbol.");

  if (requirements.hasAtSymbol && !requirements.validStructure)
    errors.push("Invalid email format.");

  return {
    isValid: errors.length === 0,
    errors,
    message: errors.length ? errors.join(" ") : "Email is valid."
  };
};

// Validate name function to validate and give information
export const validateName = (name) =>{

    const errors = [];

    // Check if the name is empty
    if (name.trim().length === 0) {
        errors.push("Name is required");
    }
    
    // Check if the name is at least three character
    if(errors.length > 2){
      errors.push("Name must be at least 3 character");
    }

    // Check if the name contains any invalid character then show errors.
    if (!/^[A-Za-z\s]+$/.test(name)) {
        errors.push("Name contains invalid characters. Only letters, and spaces are allowed.");
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      message: errors.length ? errors.join(" "): "Name is valid."
    };
}

