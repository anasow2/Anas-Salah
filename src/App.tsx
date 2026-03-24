/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Brand from './pages/Brand';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Search from './pages/Search';
import Ticket from './pages/Ticket';
import Scan from './pages/Scan';
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';
import ChatWidget from './components/ChatWidget';

export default function App() {
  return (
    <Router>
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
      <ChatWidget />
    </Router>
  );
}
