import React from "react";
import UsersView from '../components/dashboard/UsersView/UsersView';
import Sidebar from '../components/dashboard/Sidebar/Sidebar';

export const Users = () => {
    return (
        <>
            <Sidebar />
            <UsersView />
        </>
    );
};