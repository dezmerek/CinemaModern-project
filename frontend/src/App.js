import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Dashboard } from "./routers/Dashboard";
import { Users } from "./routers/Users";
import { Films } from './routers/Films';
import { FilmsAdd } from './routers/FilmsAdd';
import { HallsAdd } from './routers/HallsAdd';
import { Halls } from './routers/Halls';

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/users" element={<Users />} />
          <Route path="/dashboard/films" element={<Films />} />
          <Route path="/dashboard/films/add" element={<FilmsAdd />} />
          <Route path="/dashboard/halls" element={<Halls />} />
          <Route path="/dashboard/halls/add" element={<HallsAdd />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
