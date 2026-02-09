import { MdMedicalServices } from "react-icons/md";
import { FaCalendarCheck, FaCalendarPlus } from "react-icons/fa";
import { Link } from "react-router";
import { Tooltip } from 'react-tooltip';

import Logo from "@/assets/brand/logo";
import Container from "@/components/ui/Container";


const NAV_ITEMS = [
    {
        title: "Services",
        icon: MdMedicalServices,
        href: "/services",
        textOnHover: "Services"
    },
    {
        title: "Book an Appointment",
        icon: FaCalendarPlus,
        href: "/book-appointment",
        textOnHover: "Book an Appointment"
    },
    {
        title: "My Appointment",
        icon: FaCalendarCheck,
        href: "/my-appointment",
        textOnHover: "My Appointment"
    },

]

function Header() {
    return ( 
        <section className="w-full bg-[#232946]">
            <Container className={"flex justify-between"}>
                <Logo />
                <ul className="flex gap-2 sm:gap-3 md:gap-4 items-center">
                    {NAV_ITEMS.map(({title, icon, href, textOnHover})=>{
                        const Icon = icon;
                        return <li key={href}><Link to={href} data-tooltip-id="my-tooltip" data-tooltip-content={textOnHover} className="text-[#fffffe] hover:text-[#eebbc3] flex gap-0.5 sm:gap-1 md:gap-2 items-center"><span><Icon /></span><span>{title}</span></Link><Tooltip id="my-tooltip" style={{backgroundColor: "#121629", color: "#fffffe"}}/></li> 
                    })}
                </ul>
                
            </Container>
        </section>
     );
}

export default Header;