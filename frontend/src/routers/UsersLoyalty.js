import React from "react";
import Navbar from "../components/home/Navbar/Navbar";
import Footer from "../components/home/Footer/Footer";
import Contact from "../components/home/Contact/Contact";
import UserLoyalty from "../components/home/Profile/UserLoyalty";

const UsersLoyalty = () => {
    return (
        <div>
            <Navbar />
            <UserLoyalty />
            <Contact />
            <Footer />
        </div>
    );
}

export default UsersLoyalty;