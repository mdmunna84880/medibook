import Error from "@/components/common/Error";
import Loading from "@/components/common/Loading";
import Container from "@/components/ui/Container";
import { getAllServices } from "@/store/service/serviceThunk";
import cn from "@/utils/cn";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Services() {
    const dispatch = useDispatch();
    // Get services, loading, and error from store
    const {services, loading, error} = useSelector(state=>state.service);

    // Dispatch all services on mounted
    useEffect(()=>{
        dispatch(getAllServices());
    }, [dispatch]);

    // Show the error if there is error
    if(error) return <Error error={error} />
    // if it is loading, then show loading spinner
    if(loading) return <Loading />

    return ( 
        <div className="w-full my-12">
            <h1 className="text-center text-2xl md:text-3xl mb-4">Services offered by Us</h1>
            <Container className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6", "px-4 sm:px-6 md:px-8")}>
                {/* All card */}
                {services.map(({name, description, icon, _id:id})=>(
                    <div key={id} className={cn("bg-[#fffffe] px-2 py-1 border border-[#121629] shadow-lg rounded-lg", "scale-95 hover:scale-100 hover:shadow-xl transition-all duration-300 ease-in-out")}>
                        <img src={icon} alt={name} />
                        <h3 className="text-[#232946] text-xl md:text-2xl">{name}</h3>
                        <p className="text-[#232946] text-base">{description}</p>
                    </div>
                ))}
            </Container>
        </div>
     );
}

export default Services;