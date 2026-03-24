/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ChatWidget from './components/ChatWidget';

const Home = lazy(() => import('./pages/Home'));
const Explore = lazy(() => import('./pages/Explore'));
const Brand = lazy(() => import('./pages/Brand'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Login = lazy(() => import('./pages/Login'));
const Search = lazy(() => import('./pages/Search'));
const Ticket = lazy(() => import('./pages/Ticket'));
const Scan = lazy(() => import('./pages/Scan'));
const Bookings = lazy(() => import('./pages/Bookings'));
const Profile = lazy(() => import('./pages/Profile'));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
      <ChatWidget />
    </Router>
  );
}
