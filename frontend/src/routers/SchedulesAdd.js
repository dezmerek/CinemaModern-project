import React, { useEffect, useState } from "react";
import ScheduleAdd from '../components/dashboard/ScheduleView/ScheduleAdd';
import Sidebar from '../components/dashboard/Sidebar/Sidebar';

export const SchedulesAdd = () => {
    useEffect(() => {
        document.title = 'CinemaModern - Dodaj seans';
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
                    <ScheduleAdd />
                </div>
            </div>
        </>
    );
};
