import React, { useEffect, useState } from "react";
import Sidebar from '../components/dashboard/Sidebar/Sidebar';
import MoviePreview from "../components/dashboard/FilmView/MoviePreview";

export const MoviesPreview = () => {
    const [isFlex, setIsFlex] = useState(window.innerWidth >= 992);
    useEffect(() => {
        document.title = `CinemaModern - Zapowiedzi filmów`;
    });

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
            <div style={isFlex ? { display: 'flex', gap: '3rem', maxWidth: '1110px', margin: '1rem auto' } : {}}>
                <Sidebar />
                <div style={{ overflowX: 'auto', width: '100%' }}>
                    <MoviePreview />
                </div>
            </div>
        </>
    );
};
