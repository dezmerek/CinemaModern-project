import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Users } from "./routers/Users";


function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/dashboard/users" element={<Users />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
