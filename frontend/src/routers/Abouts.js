import React, { useEffect } from 'react';
import Navbar from "../components/home/Navbar/Navbar";
import Footer from "../components/home/Footer/Footer";
import Contact from "../components/home/Contact/Contact";
import About from "../components/home/About/About";

const Abouts = () => {
    useEffect(() => {
        document.title = 'CinemaModern - O nas';
    }, []);
    return (
        <div>
            <Navbar />
            <About />
            <Contact />
            <Footer />
        </div>
    );
}

export default Abouts;