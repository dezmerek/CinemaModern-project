import React from "react";
import UsersView from '../components/dashboard/UsersView/UsersView';
import Sidebar from '../components/dashboard/Sidebar/Sidebar';

export const Users = () => {
    return (
        <div style={{ display: 'flex', gap: '3rem' }}>
            <Sidebar />
            <div style={{ flexBasis: '100%' }}>
                <UsersView />
            </div>
        </div>
    );
};