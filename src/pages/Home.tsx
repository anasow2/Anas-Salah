import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Plane, Bus, PlaneTakeoff, Calendar, Search, ArrowRight, ShieldCheck, Headset, MapPin, Globe, Share2, Mail, Users, PlaneLanding, QrCode } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('flight');
  const [tripType, setTripType] = useState('round-trip');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const returnParam = tripType === 'round-trip' ? `&return=${returnDate}` : '';
    navigate(`/search?type=${activeTab}&origin=${origin}&dest=${destination}&depart=${departDate}${returnParam}&pax=${passengers}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-20">
      {/* Navigation Bar */}
      <nav className="fixed w-full left-0 top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" aria-label="SAHAL Home" className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center" aria-hidden="true">
                <Zap className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold tracking-tighter text-slate-900">SAHAL</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-semibold hover:text-primary transition-colors">Flights</Link>
              <Link to="/" className="text-sm font-semibold hover:text-primary transition-colors">Buses</Link>
              <Link to="/explore" className="text-sm font-semibold hover:text-primary transition-colors">Explore</Link>
              <Link to="/bookings" className="text-sm font-semibold hover:text-primary transition-colors">My Bookings</Link>
              <Link to="/profile" className="text-sm font-semibold hover:text-primary transition-colors">Profile</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/scan" className="hidden sm:flex items-center gap-2 text-sm font-bold text-primary bg-primary/10 px-4 py-2 hover:bg-primary/20 rounded-lg transition-colors">
                <QrCode className="w-4 h-4" /> Scan Ticket
              </Link>
              <Link to="/login" className="hidden sm:block text-sm font-semibold px-4 py-2 hover:bg-slate-100 rounded-lg transition-colors">Sign In</Link>
              <Link to="/signup" className="bg-primary hover:bg-primary/90 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-primary/25">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background-light z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        <div className="relative z-20 max-w-6xl w-full px-4 text-center mt-10">
          <h1 className="text-white text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
            Wax walba si sahlan
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-12 font-medium max-w-2xl mx-auto">
            The fastest way to book your next journey across Somalia and beyond.
          </p>

          {/* Interactive Search Card */}
          <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-[2.5rem] shadow-2xl border border-white/20 text-left">
            {/* Tabs & Options */}
            <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-4">
              <div className="flex gap-2" role="tablist" aria-label="Transport Type">
                <button
                  role="tab"
                  aria-selected={activeTab === 'flight'}
                  onClick={() => setActiveTab('flight')}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'flight' ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-100'}`}
                >
                  <Plane className="w-5 h-5" aria-hidden="true" /> Flights
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'bus'}
                  onClick={() => setActiveTab('bus')}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'bus' ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-100'}`}
                >
                  <Bus className="w-5 h-5" aria-hidden="true" /> Buses
                </button>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                  <input type="radio" name="tripType" checked={tripType === 'one-way'} onChange={() => setTripType('one-way')} className="text-primary focus:ring-primary w-4 h-4" />
                  One Way
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                  <input type="radio" name="tripType" checked={tripType === 'round-trip'} onChange={() => setTripType('round-trip')} className="text-primary focus:ring-primary w-4 h-4" />
                  Round Trip
                </label>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-center bg-white border border-slate-200 rounded-2xl lg:rounded-full p-2 shadow-sm">
              <div className="flex-1 w-full group relative px-4 py-2 border-b lg:border-b-0 lg:border-r border-slate-200">
                <label htmlFor="origin" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">From</label>
                <div className="relative flex items-center">
                  <MapPin className="text-slate-400 group-focus-within:text-primary w-5 h-5 mr-2 shrink-0" aria-hidden="true" />
                  <input id="origin" required value={origin} onChange={(e) => setOrigin(e.target.value)} type="text" placeholder="City or Airport" className="w-full bg-transparent text-slate-900 font-semibold outline-none placeholder:text-slate-400" />
                </div>
              </div>
              
              <div className="flex-1 w-full group relative px-4 py-2 border-b lg:border-b-0 lg:border-r border-slate-200">
                <label htmlFor="destination" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">To</label>
                <div className="relative flex items-center">
                  <PlaneLanding className="text-slate-400 group-focus-within:text-primary w-5 h-5 mr-2 shrink-0" aria-hidden="true" />
                  <input id="destination" required value={destination} onChange={(e) => setDestination(e.target.value)} type="text" placeholder="City or Airport" className="w-full bg-transparent text-slate-900 font-semibold outline-none placeholder:text-slate-400" />
                </div>
              </div>

              <div className="flex-1 w-full group relative px-4 py-2 border-b lg:border-b-0 lg:border-r border-slate-200">
                <label htmlFor="departDate" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Depart</label>
                <div className="relative flex items-center">
                  <Calendar className="text-slate-400 group-focus-within:text-primary w-5 h-5 mr-2 shrink-0" aria-hidden="true" />
                  <input id="departDate" required value={departDate} onChange={(e) => setDepartDate(e.target.value)} type="date" className="w-full bg-transparent text-slate-900 font-semibold outline-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full cursor-pointer" />
                </div>
              </div>

              <div className="flex-1 w-full group relative px-4 py-2 border-b lg:border-b-0 lg:border-r border-slate-200">
                <label htmlFor="returnDate" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Return</label>
                <div className="relative flex items-center">
                  <Calendar className="text-slate-400 group-focus-within:text-primary w-5 h-5 mr-2 shrink-0" aria-hidden="true" />
                  <input id="returnDate" required={tripType === 'round-trip'} disabled={tripType === 'one-way'} value={returnDate} onChange={(e) => setReturnDate(e.target.value)} type="date" className="w-full bg-transparent text-slate-900 font-semibold outline-none disabled:opacity-50 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full cursor-pointer" />
                </div>
              </div>

              <div className="px-2 py-2 w-full lg:w-auto shrink-0">
                <button type="submit" className="w-full lg:w-auto bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-xl lg:rounded-full transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
                  <Search className="w-5 h-5" /> Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight mb-2">Popular Routes</h2>
            <p className="text-slate-500 font-medium">Explore the most traveled destinations this season</p>
          </div>
          <Link to="/explore" className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Route Card 1 */}
          <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300">
            <div className="relative h-48">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwX0PNRg4ZmF7ZucQSD-8kE129xIfYdW44frbS0mNKKl9cMfpa2e6qdfmfnKfUGwooNJDdL4P2nsfVZzfq3Hn4IEQrEsXC5S5xJGZyRD9nNlC7iJ1lzUkNSVOe1x6TJWXeEbdASp9LEhlV8oec1QtmoZLAQx_v4f0SLM2vsw87Iizg30kxHWexXCApfWqlTIv-1-w88AHxWWDZQ2epgaZTGbYIr8E0iYOpy9wIdSj1PJmIZzXh96b3diTlnxBhcpAsheN66cR20sQ" alt="Mogadishu" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute bottom-4 left-4 z-20">
                <span className="bg-secondary text-white text-[10px] font-extrabold uppercase px-2 py-1 rounded mb-2 inline-block">Daily Flights</span>
                <h3 className="text-white text-xl font-bold">Mogadishu to Garowe</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-500 text-sm font-medium">Starting from</span>
                <span className="text-2xl font-extrabold text-primary">$120</span>
              </div>
              <button onClick={() => navigate('/search?origin=Mogadishu&dest=Garowe')} className="w-full py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors">Book Now</button>
            </div>
          </div>
          {/* Route Card 2 */}
          <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300">
            <div className="relative h-48">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAge1lVS6ccSHJ-Z-GQpv_W6W5KstYQqGz0NsXs1zuQkDKxR_iS05Vew-WvViuxtM3Wv4G_fxO2CmE1TohHeCaMKZbZxGi811DQ6Orw_hycqbxBqriuzbvTDs_M0WXpppg5-71JJ0PyPuekxc4Q_RmrVod5IxmmUwxeO7hityszC7mcnsqGraXp20J67AhaXkiSjiOxVVREHJPZAdQDPQhaTfMebcn0CeuPxRPTSW5iGmywT_eUOPjolXNfbzGrTdXr-pCm5a-cuP8" alt="Hargeisa" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute bottom-4 left-4 z-20">
                <span className="bg-secondary text-white text-[10px] font-extrabold uppercase px-2 py-1 rounded mb-2 inline-block">Luxury Bus</span>
                <h3 className="text-white text-xl font-bold">Mogadishu to Hargeisa</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-500 text-sm font-medium">Starting from</span>
                <span className="text-2xl font-extrabold text-primary">$45</span>
              </div>
              <button onClick={() => navigate('/search?type=bus&origin=Mogadishu&dest=Hargeisa')} className="w-full py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors">Book Now</button>
            </div>
          </div>
          {/* Route Card 3 */}
          <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300">
            <div className="relative h-48">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800" alt="Kismayo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              <div className="absolute bottom-4 left-4 z-20">
                <span className="bg-secondary text-white text-[10px] font-extrabold uppercase px-2 py-1 rounded mb-2 inline-block">Business Class</span>
                <h3 className="text-white text-xl font-bold">Kismayo to Mogadishu</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-500 text-sm font-medium">Starting from</span>
                <span className="text-2xl font-extrabold text-primary">$85</span>
              </div>
              <button onClick={() => navigate('/search?origin=Kismayo&dest=Mogadishu')} className="w-full py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors">Book Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-100 py-20 w-full">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold mb-2">Instant Booking</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Book your tickets in under 60 seconds with our streamlined process.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold mb-2">Secure Payments</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Multiple payment options including Sahal, EVC Plus, and Credit Cards.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Headset className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold mb-2">24/7 Support</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Our customer service team is always here to help with your journey.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <MapPin className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold mb-2">Live Tracking</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Track your bus or flight status in real-time through the SAHAL app.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-20 pb-10 w-full mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center">
                  <Zap className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-extrabold tracking-tighter text-slate-900">SAHAL</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                SAHAL is Somalia's leading travel platform, making transportation accessible, affordable, and reliable for everyone across the country.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-6">Company</h5>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><Link to="/brand" className="hover:text-primary transition-colors">Brand Identity</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Partnerships</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6">Resources</h5>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Travel Tips</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Routes Map</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6">Connect</h5>
              <div className="flex gap-4">
                <a href="#" aria-label="Visit our website" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                  <Globe className="w-5 h-5" aria-hidden="true" />
                </a>
                <a href="#" aria-label="Share on social media" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                  <Share2 className="w-5 h-5" aria-hidden="true" />
                </a>
                <a href="#" aria-label="Contact us via email" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 text-sm">© 2023 SAHAL Travel Technologies. All rights reserved.</p>
            <div className="flex gap-8 text-sm text-slate-400">
              <a href="#" className="hover:text-slate-600">Terms of Service</a>
              <a href="#" className="hover:text-slate-600">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
