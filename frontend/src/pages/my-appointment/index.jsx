/** @format */

import Container from "@/components/ui/Container";
import { getAllAppointments, getAllDistinctYear } from "@/store/appointment/appointmentThunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckUPImg from "@/assets/appointment/doctor_checkup_image.jpg";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";
import cn from "@/utils/cn";
import Select from "react-select";
import { useState, useMemo } from "react";

// All option for dropdown
const ALL_OPTION = { label: "All", value: null };

function MyAppointment() {
  const dispatch = useDispatch();
  const { appointments, isError, message, loading, yearsWithId } = useSelector(
    (state) => state.appointment,
  );
//   Track options selection
  const [selectedYear, setSelectedYear] = useState(ALL_OPTION);

  //   Create options for the dropdown with optimisation
  const yearOptions = useMemo(() => {
    const base = [ALL_OPTION];
    if (!yearsWithId) return base;
    return [
      ...base,
      ...yearsWithId.map((y) => ({
        label: y.year.toString(),
        value: y.year,
      })),
    ];
  }, [yearsWithId]);

//   Dispatch the getalldistinctyear to get the unique, sorted year
  useEffect(()=>{
    dispatch(getAllDistinctYear());
  }, [dispatch]);

//   Dispatch the get appointment to get the all appointments
  useEffect(() => {
    dispatch(getAllAppointments(selectedYear?.value));
  }, [dispatch, selectedYear]);

//   If error occured
  if (isError) return <Error error={message} />;
//   If loading is happening
  if (loading) return <Loading />;

  return (
    <div className="my-12 mx-4 md:mx-6">
      <div className="mb-8 md:mb-10 flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold">My Appointments</h1>
        {/* Filter base on year */}
        <div className="w-60 mt-2">
          <Select
            options={yearOptions}
            value={selectedYear}
            onChange={(option) => setSelectedYear(option || ALL_OPTION)}
            placeholder="Select Year to Filter out"
            isClearable
          />
        </div>
      </div>
      <Container
        className={
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
        }
      >
        {appointments.map(
          ({ _id: id, appointmentAt, doctorId: doctor, userId: user }) => (
            // Appointment Card
            <div
              key={id}
              className={cn(
                "bg-[#fffffe] text-[#232946] border border-[#121629] rounded-md",
                "group transition-all duration-300 ease-in-out hover:rounded-xl hover:scale-105",
              )}
            >
              <div className="overflow-hidden relative">
                <img
                  src={CheckUPImg}
                  alt="Check up image"
                  className={cn(
                    "object-contain rounded-t-md hover:rounded-t-xl scale-95",
                    "group-hover:scale-100 transition-all duration-300 ease-in-out",
                  )}
                />
                <p className="absolute top-2 right-2 text-base">
                  {new Date(appointmentAt).toLocaleString()}
                </p>
              </div>
              <div className="my-4 mx-2 flex flex-col gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl mb-1">Doctors Detail</h3>
                  <p className="text-base">
                    Name: <span className="font-semibold">{doctor?.name}</span>
                  </p>
                  <p>Department: {doctor?.department}</p>
                  <p>Rating: {doctor?.rating}</p>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl mb-1">Patient Detail</h3>
                  <p className="text-base">
                    Name: <span className="font-semibold">{user?.name}</span>
                  </p>
                  <p>Email: {user?.email}</p>
                </div>
              </div>
            </div>
          ),
        )}
      </Container>
    </div>
  );
}

export default MyAppointment;
