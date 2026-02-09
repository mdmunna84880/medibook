import Container from "@/components/ui/Container";

function Footer() {
    const year = new Date().getFullYear();
    return ( 
        <section className="w-full bg-[#232946] py-2 sm:py-4 md:py-6 lg:py-8 flex justify-center items-center mb-0">
            <Container className={"text-[#fffffe] text-center"}>&copy; {year} MediBook. All rights reserved.</Container>
        </section>
     );
}

export default Footer;