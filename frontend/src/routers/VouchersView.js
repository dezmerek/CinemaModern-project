import React, { useEffect, useState } from "react";
import Sidebar from '../components/dashboard/Sidebar/Sidebar';
import VoucherView from "../components/dashboard/VoucherView/VoucherView";

export const VouchersView = () => {
    const [isFlex, setIsFlex] = useState(window.innerWidth >= 992);
    useEffect(() => {
        document.title = `CinemaModern - Lista biletów`;
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
                    <VoucherView />
                </div>
            </div>
        </>
    );
};
