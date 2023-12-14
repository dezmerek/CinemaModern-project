import React, { useEffect } from 'react';
import Navbar from "../components/home/Navbar/Navbar";
import Footer from "../components/home/Footer/Footer";
import Contact from "../components/home/Contact/Contact";
import ReportireList from "../components/home/Repertoire/RepertoireList"

const ReportiresList = () => {
    useEffect(() => {
        document.title = 'CinemaModern - Repertuar';
    }, []);
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