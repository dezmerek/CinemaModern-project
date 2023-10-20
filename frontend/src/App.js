import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Dashboard } from "./routers/Dashboard";
import { Users } from "./routers/Users";


function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/users" element={<Users />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
