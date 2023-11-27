import React from "react";
import Navbar from "../components/home/Navbar/Navbar";
import Footer from "../components/home/Footer/Footer";
import Contact from "../components/home/Contact/Contact";
import PrivacyPolicy from "../components/home/PrivacyPolicy/PrivacyPolicy";

const Home = () => {
    return (
        <div>
            <Navbar />
            <PrivacyPolicy />
            <Contact />
            <Footer />
        </div>
    );
}

export default Home;