/** @format */

import Container from "@/components/ui/Container";
import { getPatientDetail, updateProfile } from "@/store/user/userThunk";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInitialValidationState,
  validateRequired,
} from "./utils";
import { validatePhone } from "@/utils/validation";
import { toast } from "react-toastify";
import Input from "@/components/ui/Input";
import cn from "@/utils/cn";
import Error from "@/components/common/Error";
import Loading from "@/components/common/Loading";

function Dashboard() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  
  const initialState = useMemo(()=>(
    {
    phone: user?.phone || "",
    address: {
        addressLine1: user?.address?.addressLine1 || "",
        addressLine2: user?.address?.addressLine2 || "",
        city: user?.address?.city ||  "",
        state: user?.address?.state ||  "",
        zipCode: user?.address?.zipCode || "",
        nationality: user?.address?.nationality || ""
    }
}
  ), [user])

  const validationState = useMemo(
    () => getInitialValidationState(initialState),
    [initialState],
  );
  //   State for the form and validation
  const [userData, setUserData] = useState(initialState);
  const [touched, setTouched] = useState(validationState);
  const [isFieldChanged, setIsFieldChanged] = useState(false);
  // Validate the phone response
  const validatePhoneRes = validatePhone(userData.phone)
  //   Is button dissabled or not
  const isSaveDissabled = !validatePhoneRes.isValid || Object.values(userData.address).some((field) => validateRequired(field)) || !isFieldChanged;

  // Handle Input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name.startsWith("address.")){
        const key = name.split(".")[1];
        setUserData((prev) => ({ ...prev,  address: {...prev.address, [key]: value}}));
    }else{
        setUserData((prev)=>({...prev, [name]: value}));
    }
    // Field changed
    setIsFieldChanged(true);
  };

  // Handle the validate or error show
  const handleInputBlur = (e) => {
    e.preventDefault();
     const { name } = e.target;
    if(name.startsWith("address.")){
        const key = name.split(".")[1];
        setTouched((prev) => ({ ...prev,  address: {...prev.address, [key]: true}}));
    }else{
        setTouched((prev)=>({...prev, [name]: true}));
    }
  };

  // Handle the submit of the form like address, and phone
  const handleSubmission = (e) => {
    e.preventDefault();
    dispatch(
      updateProfile({
        phone: userData.phone,
        address: userData.address,
      }),
    );
    if (!error && !loading)
      toast.success("You have successfully saved your phone and address");
      setIsFieldChanged(false);
  };

  // Handle the reset functionality
  const handleDiscard = ()=>{
    setUserData(prev=>({...prev, address: user?.address || {}, phone: user?.phone || ""}))
  }

  // Set the userData to initialState when it get from api
  useEffect(() => {
  setUserData(initialState);
}, [initialState]);

  // Get the patient details
  useEffect(() => {
    dispatch(getPatientDetail());
  }, [dispatch]);

  if (error) return <Error error={error}/>;
  if (loading) return <Loading />;
  return (
    <div className="w-full my-12">
      <Container className={"px-4 md:px-6"}>
        <h1 className="text-center text-2xl md:text-3xl mb-4">Patient Dashboard</h1>
        <div className={cn("bg-[#fffffe] border border-[#121629] px-4 md:px-6 py-4 md:py-6 shadow-md rounded-md max-w-5xl mx-auto")}>
          <h2 className="text-xl md:text-2xl text-center mb-2">Patient Details</h2>
          <form onSubmit={handleSubmission} className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
          <Input
            label={"Enter your name"}
            placeholder={"Md Munna"}
            name="name"
            value={user.name}
            inputCN={"bg-gray-200"}
            className={"cursor-pointer disabled:cursor-not-allowed"}
            readOnly
            disabled
          />
          <Input
            label={"Enter your email"}
            placeholder={"mdmunna19434@gmail.com"}
            name="email"
            value={user.email}
            inputCN={"bg-gray-200"}
            className={"cursor-pointer disabled:cursor-not-allowed"}
            readOnly
            disabled
          />
          <Input
            label={"Enter your phone no."}
            placeholder={"7050498963"}
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={
            touched.phone && !validatePhoneRes.isValid
              ? validatePhoneRes.errors[0]
              : ""
          }
          />
          <Input
            label={"Enter your addreess line 1"}
            placeholder={"Flat No. 204, Shanti Residency"}
            name="address.addressLine1"
            value={userData.address.addressLine1}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={touched.address.addressLine1 && validateRequired(userData.address.addressLine1)}
          />
          <Input
            label={"Enter your addreess line 1"}
            placeholder={"Road No. 5, Rajendra Nagar"}
            name="address.addressLine2"
            value={userData.address.addressLine2}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={touched.address.addressLine2 && validateRequired(userData.address.addressLine2)}
          />
          <Input
            label={"Enter your city"}
            placeholder={"Muzaffarupr"}
            name="address.city"
            value={userData.address.city}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={touched.address.city && validateRequired(userData.address.city)}
          />
          <Input
            label={"Enter your state"}
            placeholder={"Bihar"}
            name="address.state"
            value={userData.address.state}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={touched.address.state && validateRequired(userData.address.state)}
          />
          <Input
            label={"Enter your nationality"}
            placeholder={"Indian"}
            name="address.nationality"
            value={userData.address.nationality}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={touched.address.nationality && validateRequired(userData.address.nationality)}
          />
          <Input
            label={"Enter your zip code"}
            placeholder={"843127"}
            name="address.zipCode"
            value={userData.address.zipCode}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={touched.address.zipCode && validateRequired(userData.address.zipCode)}
          />
          <div />
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSaveDissabled}
            className={cn(
              "w-full border border-[#121629] bg-[#b8c1ec] rounded-sm md:rounded-md py-1 text-lg",
              "flex items-center justify-center gap-2",
              "cursor-pointer text-[#232946] disabled:bg-gray-400 disabled:cursor-not-allowed",
            )}
          >
            {loading ? (
              <>
                {/* Small apinner in the button */}
                <span className="w-4 h-4 border-2 border-[#232946] border-t-transparent rounded-full animate-spin"></span>
                Saving ...
              </>
            ) : (
              "Save this profile"
            )}

          </button>
          {/* Reset Button */}
           <button
            type="button"
            onClick={handleDiscard}
            className={cn(
              "w-full border border-[#121629] bg-red-400 rounded-sm md:rounded-md py-1 text-lg",
              "flex items-center justify-center gap-2",
              "cursor-pointer text-[#232946]",
            )}
          >
            Reset
          </button>
        </form>
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
