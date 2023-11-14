import React, { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar/Sidebar";
import DashboardView from "../components/dashboard/Dashboard/DashboardView";

export const Dashboard = () => {
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
        <> <div style={isFlex ? { display: 'flex', gap: '3rem' } : {}}>
            <Sidebar />
            <div style={isFlex ? { flex: 1 } : {}}>
                <DashboardView />
            </div></div>
        </>
    );
};