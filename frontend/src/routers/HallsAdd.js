import React, { useEffect, useState } from "react";
import HallAdd from '../components/dashboard/HallView/HallAdd';
import Sidebar from '../components/dashboard/Sidebar/Sidebar';

export const HallsAdd = () => {
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
                    <HallAdd />
                </div>
            </div>
        </>
    );
};
