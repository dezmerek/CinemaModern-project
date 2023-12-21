import React, { useEffect, useState } from "react";
import UserView from '../components/dashboard/UserView/UserView';
import Sidebar from '../components/dashboard/Sidebar/Sidebar';

export const Users = () => {
    useEffect(() => {
        document.title = 'CinemaCity - Lista użytkowników';
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
                    <UserView />
                </div>
            </div>
        </>
    );
};
