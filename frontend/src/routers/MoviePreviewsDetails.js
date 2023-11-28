import React from "react";
import Navbar from "../components/home/Navbar/Navbar";
import Footer from "../components/home/Footer/Footer";
import Contact from "../components/home/Contact/Contact";
import MoviePreviewsDetail from "../components/home/MoviePreviews/MoviePreviewsDetail";
import MovieRecommended from "../components/home/MovieRecommended/MovieRecommended";

const MoviePreviewsDetails = () => {
    return (
        <div>
            <Navbar />
            <MoviePreviewsDetail />
            <MovieRecommended />
            <Contact />
            <Footer />
        </div>
    );
}

export default MoviePreviewsDetails;