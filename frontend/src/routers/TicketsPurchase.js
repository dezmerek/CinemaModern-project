import React from "react";
import Navbar from "../components/home/Navbar/Navbar";
import Footer from "../components/home/Footer/Footer";
import Contact from "../components/home/Contact/Contact";
import TicketPurchase from "../components/home/TicketPurchase/TicketPurchase";

const TicketsPurchase = () => {
    return (
        <div>
            <Navbar />
            <TicketPurchase />
            <Contact />
            <Footer />
        </div>
    );
}

export default TicketsPurchase;