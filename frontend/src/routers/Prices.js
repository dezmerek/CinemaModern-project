import React, { useEffect } from 'react';
import Navbar from "../components/home/Navbar/Navbar";
import Footer from "../components/home/Footer/Footer";
import Contact from "../components/home/Contact/Contact";
import Price from "../components/home/Price/Price"

const Termss = () => {
    useEffect(() => {
        document.title = 'CinemaModern - Cennik';
    }, []);
    return (
        <div>
            <Navbar />
            <Price />
            <Contact />
            <Footer />
        </div>
    );
}

export default Termss;