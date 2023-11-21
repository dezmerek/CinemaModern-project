import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Banner from "../components/Banner/Banner";
import RecommendedVideos from "../components/RecommendedVideos/RecommendedVideos";
import Footer from "../components/Footer/Footer";
import PreviewsVideo from "../components/PreviewsVideo/PreviewsVideo";

const Home = () => {
    return (
        <div>
            <Navbar />
            <Banner />
            <RecommendedVideos />
            <PreviewsVideo />
            <Footer />
        </div>
    );
}

export default Home;