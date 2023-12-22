import React, { useEffect } from 'react';
import Navbar from "../components/home/Navbar/Navbar";
import Footer from "../components/home/Footer/Footer";
import Contact from "../components/home/Contact/Contact";
import MoviePreviewsList from "../components/home/MoviePreviews/MoviePreviewsList";

const MoviePreviewsLists = () => {
    useEffect(() => {
        document.title = 'CinemaModern - Zapowiedzi filmów';
    }, []);
    return (
        <div>
            <Navbar />
            <MoviePreviewsList />
            <Contact />
            <Footer />
        </div>
    );
}

export default MoviePreviewsLists;