import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './components/home/Auth/AuthContext';
import NotFound from './components/common/NotFound/NotFound';
import AccessDenied from './components/common/AccessDenied/AccessDenied';

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
import { SchedulesList } from './routers/SchedulesList';
import { TicketsView } from './routers/TicketsView';
import { VouchersView } from './routers/VouchersView';
import { VouchersAdd } from './routers/VouchersAdd';
import UsersProfile from './routers/UsersProfile';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const ProtectedRoute = ({ element, adminOnly }) => {
  const auth = useAuth();

  if (auth.user) {
    if (adminOnly && auth.user.role !== 'admin') {
      return <Navigate to="/brak-dostepu" />;
    } else {
      return element;
    }
  } else {
    // Redirect to login or handle unauthenticated users
    return <Navigate to="/" />;
  }
};

function App() {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <BrowserRouter>
          <>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute element={<Dashboard />} adminOnly={true} />
                }
              />
              <Route
                path="/dashboard/users"
                element={
                  <ProtectedRoute element={<Users />} adminOnly={true} />
                }
              />
              <Route
                path="/dashboard/movies"
                element={
                  <ProtectedRoute element={<Films />} adminOnly={true} />
                }
              />
              <Route
                path="/dashboard/movies/preview"
                element={
                  <ProtectedRoute
                    element={<MoviesPreview />}
                    adminOnly={true}
                  />
                }
              />
              <Route
                path="/dashboard/movies/recommended"
                element={
                  <ProtectedRoute
                    element={<MoviesRecommended />}
                    adminOnly={true}
                  />
                }
              />
              <Route
                path="/dashboard/movies/add"
                element={
                  <ProtectedRoute element={<FilmsAdd />} adminOnly={true} />
                }
              />
              <Route
                path="/dashboard/banners/add"
                element={
                  <ProtectedRoute element={<BannersAdd />} adminOnly={true} />
                }
              />
              <Route
                path="/dashboard/halls"
                element={<ProtectedRoute element={<Halls />} adminOnly={true} />}
              />
              <Route
                path="/dashboard/halls/add"
                element={
                  <ProtectedRoute element={<HallsAdd />} adminOnly={true} />
                }
              />
              <Route
                path="/dashboard/schedules"
                element={
                  <ProtectedRoute element={<SchedulesList />} adminOnly={true} />
                }
              />
              <Route
                path="/dashboard/schedules/add"
                element={
                  <ProtectedRoute element={<SchedulesAdd />} adminOnly={true} />
                }
              />
              <Route
                path="/dashboard/tickets"
                element={
                  <ProtectedRoute element={<TicketsView />} adminOnly={true} />
                }
              />
              <Route
                path="/dashboard/vouchers"
                element={
                  <ProtectedRoute element={<VouchersView />} adminOnly={true} />
                }
              />
              <Route
                path="/dashboard/vouchers/add"
                element={
                  <ProtectedRoute element={<VouchersAdd />} adminOnly={true} />
                }
              />

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
              <Route path="/profil/" element={<UsersProfile />} />


              <Route path="/*" element={<NotFound />} />
              <Route path="/brak-dostepu" element={<AccessDenied />} />
            </Routes>
          </>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;
