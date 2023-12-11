import React from "react";
import Navbar from "../components/home/Navbar/Navbar";
import Footer from "../components/home/Footer/Footer";
import Contact from "../components/home/Contact/Contact";
import PaymentSummary from "../components/home/TicketPurchase/PaymentSummary";

const PaymentsSummary = () => {
    return (
        <div>
            <Navbar />
            <PaymentSummary />
            <Contact />
            <Footer />
        </div>
    );
}

export default PaymentsSummary;