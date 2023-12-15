import React, { useEffect } from "react";
import Navbar from "../components/home/Navbar/Navbar";
import Footer from "../components/home/Footer/Footer";
import Contact from "../components/home/Contact/Contact";
import LoyaltyProgram from "../components/home/loyaltyProgram/loyaltyProgram";

const LoyaltyPrograms = () => {
    useEffect(() => {
        document.title = 'CinemaCity - Program lojalnościowy';
    }, []);
    return (
        <div>
            <Navbar />
            <LoyaltyProgram />
            <Contact />
            <Footer />
        </div>
    );
}

export default LoyaltyPrograms;