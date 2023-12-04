import React from "react";
import Navbar from "../components/home/Navbar/Navbar";
import Footer from "../components/home/Footer/Footer";
import Contact from "../components/home/Contact/Contact";
import ReportireList from "../components/home/Repertoire/RepertoireList"

const ReportiresList = () => {
    return (
        <div>
            <Navbar />
            <ReportireList />
            <Contact />
            <Footer />
        </div>
    );
}

export default ReportiresList;