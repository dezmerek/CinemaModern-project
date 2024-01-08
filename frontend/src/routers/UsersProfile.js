import React, { useEffect } from "react";
import Navbar from "../components/home/Navbar/Navbar";
import Footer from "../components/home/Footer/Footer";
import Contact from "../components/home/Contact/Contact";
import UserProfile from "../components/home/Profile/UserProfile";

const UsersProfile = () => {


    return (
        <div>
            <Navbar />
            <UserProfile />
            <Contact />
            <Footer />
        </div>
    );
}

export default UsersProfile;