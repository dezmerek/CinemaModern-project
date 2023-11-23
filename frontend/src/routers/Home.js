import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Banner from "../components/Banner/Banner";
import MovieRecommended from "../components/MovieRecommended/MovieRecommended";
import Footer from "../components/Footer/Footer";
import MoviePreviews from "../components/MoviePreviews/MoviePreviews";
import Contact from "../components/Contact/Contact";
import AdvertisementView from "../components/Advertisement/AdvertisementView";

const Home = () => {
    return (
        <div>
            <Navbar />
            <Banner />
            <MovieRecommended />
            <AdvertisementView />
            <MoviePreviews />
            <Contact />
            <Footer />
        </div>
    );
}

export default Home;