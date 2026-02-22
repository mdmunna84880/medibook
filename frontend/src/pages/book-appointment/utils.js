/** @format */

// Validate minimum date so that the date must be the future date
export const validateMinDate = (dateValue) => {
  const inputDate = dateValue ? new Date(dateValue) : null;

  // Get only today and set the time to 0
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get the input date and set time to 0
  if (inputDate) inputDate.setHours(0, 0, 0, 0);

  const requirements = {
    notEmpty: !!dateValue,
    validDate: inputDate instanceof Date && !isNaN(inputDate),
    isFuture:
      inputDate instanceof Date && !isNaN(inputDate) && inputDate > today,
  };

  const errors = [];

  if (!requirements.notEmpty) {
    errors.push("Date is required.");
  }

  if (requirements.notEmpty && !requirements.validDate) {
    errors.push("Enter a valid date.");
  }

  if (requirements.validDate && !requirements.isFuture) {
    errors.push("Date must be a future date (not today).");
  }

  return {
    isValid: errors.length === 0,
    errors,
    message: errors.length ? errors.join(" ") : "Date is valid.",
  };
};

// Validate department function to validate and give useful information
export const validateDepartment = (department = "") => {
  const trimmed = department.trim();

  const requirements = {
    notEmpty: trimmed.length > 0,
    minLength: trimmed.length >= 2,
    validChars: /^[A-Za-z\s&-]+$/.test(trimmed),
  };

  const errors = [];

  if (!requirements.notEmpty) {
    errors.push("Department is required.");
  }

  if (requirements.notEmpty && !requirements.minLength) {
    errors.push("Department must be at least 2 characters.");
  }

  if (requirements.notEmpty && !requirements.validChars) {
    errors.push(
      "Department contains invalid characters. Only letters, spaces, '&' and '-' are allowed.",
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
    message: errors.length ? errors.join(" ") : "Department is valid.",
  };
};
