/** @format */

import Error from "@/components/common/Error";
import Loading from "@/components/common/Loading";
import Container from "@/components/ui/Container";
import Input from "@/components/ui/Input";
import { getAllDepartments } from "@/store/doctor/doctorThunk";
import cn from "@/utils/cn";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { validateDepartment, validateMinDate } from "./utils";
import { bookAppointment } from "@/store/appointment/appointmentThunk";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function BookAppointment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Form Data tracking state
  const [appointmentAt, setAppointmentAt] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [report, setReport] = useState(null);
  const [comments, setComments] = useState("");

  // Validation State
  const [touch, setTouched] = useState({
    appointmentAt: false,
    department: false,
  });

  // Disabling state so that if the input is modified or not
  const [isModified, setIsModified] = useState(false);

  const { departments, loading, error } = useSelector((state) => state.doctor);

  // Dropdown option
  const options = departments.map((item) => ({
    label: item.department,
    value: item._id,
  }));

  // Validate detpartment and appointment
  const departmentValidation = validateDepartment(selectedDepartment?.label);
  const appointmentAtValidation = validateMinDate(appointmentAt);

  // Is book butoon disabled or not
  const isBookDisabled =
    !isModified ||
    !departmentValidation.isValid ||
    !appointmentAtValidation.isValid;

  // Get the Minimum date and time in local time and date
  const getMinDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const local = new Date(now.getTime() - offset * 60 * 1000);
    return local.toISOString().slice(0, 16);
  };

  // Show validation error on blur
  const handleBlurForValidation = (e) => {
    const { name } = e.target;
    setIsModified(true);
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Submit the data by dispatching and show success error
  const handleSubmitFormData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("doctorId", selectedDepartment.value);
    formData.append("appointmentAt", new Date(appointmentAt).toISOString());
    if (comments) formData.append("comments", comments);
    if (report) formData.append("report", report);
    try {
      await dispatch(bookAppointment(formData)).unwrap();
      toast.success("Your have booked an appointment successfully.");
      navigate("/my-appointment");
    } catch (err) {
      toast.error(err?.msg || "Failed to book an appointment.");
    }
  };

  // Get all the departments on mount
  useEffect(() => {
    dispatch(getAllDepartments());
  }, [dispatch]);

  // If loading then show loading spinner
  if (loading) return <Loading />;
  // If error show error
  if (error) return <Error error={error} />;
  return (
    <div className="my-12 w-full">
      <div className="flex flex-col items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl">Book an Appointment</h1>
        <p className="text-red-400 text-lg md:text-xl">
          <span className="font-semibold text-[#232946]">Note:</span>{" "}
          Appointment is only booked for logged patient, not for their family or
          any other person.
        </p>
      </div>
      <Container className={"flex justify-center"}>
        <form
          onSubmit={handleSubmitFormData}
          className={cn(
            "bg-[#fffffe] border border-[#121629] rounded-md md:rounded-lg px-4",
            "md:px-6 py-2 md:py-4 max-w-4xl lg:min-w-4xl flex flex-col gap-4",
          )}
        >
          <Input
            label={"Select Date and Time"}
            onBlur={handleBlurForValidation}
            onChange={(e) => setAppointmentAt(e.target.value)}
            name="appointmentAt"
            min={getMinDateTime()}
            type={"datetime-local"}
            inputCN={"border border-[#121629] "}
            error={
              touch.appointmentAt && appointmentAtValidation.isValid
                ? appointmentAtValidation.errors[0]
                : ""
            }
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="department">Select Department</label>
            <Select
              id="department"
              name="department"
              onBlur={handleBlurForValidation}
              options={options}
              value={selectedDepartment}
              onChange={setSelectedDepartment}
              className="border border-[#121629]/70 rounded-md"
            />
            {touch.appointmentAt && departmentValidation.isValid && (
              <p className="text-red-400 text-sm">
                {departmentValidation.errors[0]}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="report">Upload Report</label>
            <input
              type="file"
              id="report"
              onChange={(e) => setReport(e.target.files[0])}
              className="border border-[#121629] rounded-md md:rounded-lg w-full px-2 py-3"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="comments">Comments</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              id="comments"
              rows={3}
              className="border border-[#121629] rounded-md md:rounded-lg px-2 py-1 focus:outline-none"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isBookDisabled}
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
                Booking...
              </>
            ) : (
              "Book"
            )}
          </button>
        </form>
      </Container>
    </div>
  );
}

export default BookAppointment;