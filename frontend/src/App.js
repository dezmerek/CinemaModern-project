import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Dashboard } from "./routers/Dashboard";
import { Users } from "./routers/Users";
import { Films } from './routers/Films';
import { FilmsAdd } from './routers/FilmsAdd';
import { HallsAdd } from './routers/HallsAdd';
import { Halls } from './routers/Halls';
import { SchedulesAdd } from './routers/SchedulesAdd';
import { MoviesPreview } from './routers/MoviesPreview';
import { MoviesRecommended } from './routers/MoviesRecommended';
import Home from './routers/Home';
import { BannersAdd } from './routers/BannersAdd';
import PrivacyPolicy from './routers/PrivacyPolicy';
import Terms from './routers/Terms';
import Abouts from './routers/Abouts';
import Prices from './routers/Prices';
import LoyaltyPrograms from './routers/LoyaltyPrograms';
import MoviePreviewsLists from './routers/MoviePreviewsList';
import MovieRecommendsList from './routers/MovieRecommendsList';
import MoviePreviewsDetails from './routers/MoviePreviewsDetails';
import MovieRecommendsDetails from './routers/MovieRecommendsDetails';
import ReportiresList from './routers/ReportiresList';
import TicketsPurchase from './routers/TicketsPurchase';
import PaymentsSummary from './routers/PaymentsSummary';

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/users" element={<Users />} />
          <Route path="/dashboard/films" element={<Films />} />
          <Route path="/dashboard/films/preview" element={<MoviesPreview />} />
          <Route path="/dashboard/films/recommended" element={<MoviesRecommended />} />
          <Route path="/dashboard/films/add" element={<FilmsAdd />} />
          <Route path="/dashboard/banners/add" element={<BannersAdd />} />
          <Route path="/dashboard/halls" element={<Halls />} />
          <Route path="/dashboard/halls/add" element={<HallsAdd />} />
          <Route path="/dashboard/schedules/add" element={<SchedulesAdd />} />
          <Route path="/" element={<Home />} />
          <Route path="/polityka-prywatnosci" element={<PrivacyPolicy />} />
          <Route path="/regulamin" element={<Terms />} />
          <Route path="/o-nas" element={<Abouts />} />
          <Route path="/cennik" element={<Prices />} />
          <Route path="/program-lojalnosciowy" element={<LoyaltyPrograms />} />
          <Route path="/zapowiedz" element={<MoviePreviewsLists />} />
          <Route path="/zapowiedz/:id" element={<MoviePreviewsDetails />} />
          <Route path="/polecane" element={<MovieRecommendsList />} />
          <Route path="/film/:id" element={<MovieRecommendsDetails />} />
          <Route path="/repertuar" element={<ReportiresList />} />
          <Route path="/kup-bilet/:id" element={<TicketsPurchase />} />
          <Route path="/podsumowanie/:id" element={<PaymentsSummary />} />
          <Route path="/podsumowanie/" element={<PaymentsSummary />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
