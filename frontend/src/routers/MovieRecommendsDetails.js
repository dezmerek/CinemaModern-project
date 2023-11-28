import React from "react";
import Navbar from "../components/home/Navbar/Navbar";
import Footer from "../components/home/Footer/Footer";
import Contact from "../components/home/Contact/Contact";
import MovieRecommended from "../components/home/MovieRecommended/MovieRecommended";
import MovieRecommendsDetail from "../components/home/MovieRecommended/MovieRecommendDetail";

const MovieRecommendsDetails = () => {
    return (
        <div>
            <Navbar />
            <MovieRecommendsDetail />
            <MovieRecommended />
            <Contact />
            <Footer />
        </div>
    );
}

export default MovieRecommendsDetails;