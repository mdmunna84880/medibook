// Go to the deep of the object and initialize with false
export const getInitialValidationState = (obj)=>{
  const result = {};
  for(const [key, value] of Object.entries(obj)){
    if(key === "id" || key === "name" || key === "email") continue;
    if(value && typeof value === "object"){
      result[key] = getInitialValidationState(value);
    }else{
      result[key] = false;
    }
  }

  return result;
}

export const validateRequired = (value) =>{
  if(!value.trim()) return `${value} is required`
  else return "";
}