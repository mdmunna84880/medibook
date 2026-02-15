import { FaCalendarCheck, FaCalendarPlus } from "react-icons/fa";
import { MdMedicalServices } from "react-icons/md";

export const NAV_ITEMS = [
  {
    title: "Services",
    icon: MdMedicalServices,
    href: "/services",
    textOnHover: "Services",
  },
  {
    title: "Book an Appointment",
    icon: FaCalendarPlus,
    href: "/book-appointment",
    textOnHover: "Book an Appointment",
  },
  {
    title: "My Appointment",
    icon: FaCalendarCheck,
    href: "/my-appointment",
    textOnHover: "My Appointment",
  },
];