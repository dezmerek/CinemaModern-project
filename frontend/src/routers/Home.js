import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Banner from "../components/Banner/Banner";
import RecommendedVideos from "../components/RecommendedVideos/RecommendedVideos";
import Footer from "../components/Footer/Footer";

const Home = () => {
    return (
        <div>
            <Navbar />
            <Banner />
            <RecommendedVideos />
            <Footer />
        </div>
    );
}

export default Home;