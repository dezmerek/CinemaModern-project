import React, { useEffect, useState } from "react";
import Sidebar from '../components/dashboard/Sidebar/Sidebar';
import HallView from "../components/dashboard/HallView/HallView";

export const Halls = () => {
    useEffect(() => {
        document.title = 'CinemaCity - Lista sal';
    }, []);

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
            <div style={isFlex ? { display: 'flex', gap: '3rem', maxWidth: '1110px', margin: '1rem auto' } : {}}>
                <Sidebar />
                <div style={isFlex ? { flex: 1 } : {}}>
                    <HallView />
                </div>
            </div>
        </>
    );
};
