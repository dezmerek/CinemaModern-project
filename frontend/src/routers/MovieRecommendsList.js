import React from "react";
import Navbar from "../components/home/Navbar/Navbar";
import Footer from "../components/home/Footer/Footer";
import Contact from "../components/home/Contact/Contact";
import MovieRecommendList from "../components/home/MovieRecommended/MovieRecommendedList";

const MovieRecommendsList = () => {
    return (
        <div>
            <Navbar />
            <MovieRecommendList />
            <Contact />
            <Footer />
        </div>
    );
}

export default MovieRecommendsList;