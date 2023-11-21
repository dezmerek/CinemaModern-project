import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Banner from "../components/Banner/Banner";
import RecommendedVideos from "../components/RecommendedVideos/RecommendedVideos";
import Footer from "../components/Footer/Footer";
import PreviewsVideo from "../components/PreviewsVideo/PreviewsVideo";
import Contact from "../components/Contact/Contact";

const Home = () => {
    return (
        <div>
            <Navbar />
            <Banner />
            <RecommendedVideos />
            <PreviewsVideo />
            <Contact />
            <Footer />
        </div>
    );
}

export default Home;