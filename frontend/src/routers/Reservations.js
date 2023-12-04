import React from "react";
import Navbar from "../components/home/Navbar/Navbar";
import Footer from "../components/home/Footer/Footer";
import Contact from "../components/home/Contact/Contact";
import Reservation from "../components/home/Reservation/Reservation";

const Reservations = () => {
    return (
        <div>
            <Navbar />
            <Reservation />
            <Contact />
            <Footer />
        </div>
    );
}

export default Reservations;