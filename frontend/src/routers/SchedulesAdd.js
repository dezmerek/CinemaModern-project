import React, { useEffect, useState } from "react";
import ScheduleAdd from '../components/dashboard/ScheduleView/ScheduleAdd';
import Sidebar from '../components/dashboard/Sidebar/Sidebar';

export const SchedulesAdd = () => {
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
                <div style={isFlex ? { flex: 1 } : {}}>
                    <ScheduleAdd />
                </div>
            </div>
        </>
    );
};
