import React, { useEffect } from "react";
import Navbar from "../components/home/Navbar/Navbar";
import Footer from "../components/home/Footer/Footer";
import Contact from "../components/home/Contact/Contact";
import Terms from "../components/home/Terms/Terms";

const Termss = () => {
    useEffect(() => {
        document.title = `CinemaModern - Regulamin`;
    });

    return (
        <div>
            <Navbar />
            <Terms />
            <Contact />
            <Footer />
        </div>
    );
}

export default Termss;