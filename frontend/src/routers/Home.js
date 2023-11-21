import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Banner from "../components/Banner/Banner";
import RecommendedVideos from "../components/RecommendedVideos/RecommendedVideos";

const Home = () => {
    return (
        <div>
            <Navbar />
            <Banner />
            <RecommendedVideos />
        </div>
    );
}

export default Home;