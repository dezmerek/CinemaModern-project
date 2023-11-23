import React, { useEffect, useState } from "react";
import Sidebar from '../components/dashboard/Sidebar/Sidebar';
import MovieRecommended from "../components/dashboard/Dashboard/MovieRecommended/MovieRecommended";

export const MoviesRecommended = () => {
    const [isFlex, setIsFlex] = useState(window.innerWidth >= 992);

    useEffect(() => {
        const handleResize = () => {
            setIsFlex(window.innerWidth >= 992);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <div style={isFlex ? { display: 'flex', gap: '3rem' } : {}}>
                <Sidebar />
                <div style={{ overflowX: 'auto', width: '100%' }}>
                    <MovieRecommended />
                </div>
            </div>
        </>
    );
};
