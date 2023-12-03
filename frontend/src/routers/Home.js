import React from "react";
import Navbar from "../components/home/Navbar/Navbar";
import Banner from "../components/home/Banner/Banner";
import MovieRecommended from "../components/home/MovieRecommended/MovieRecommended";
import Footer from "../components/home/Footer/Footer";
import MoviePreviews from "../components/home/MoviePreviews/MoviePreviews";
import Contact from "../components/home/Contact/Contact";
import AdvertisementView from "../components/home/Advertisement/AdvertisementView";
import Repertoire from "../components/home/Repertoire/Repertoire";

const Home = () => {
    return (
        <div>
            <Navbar />
            <Banner />
            <Repertoire />
            <MovieRecommended />
            <AdvertisementView />
            <MoviePreviews />
            <Contact />
            <Footer />
        </div>
    );
}

export default Home;