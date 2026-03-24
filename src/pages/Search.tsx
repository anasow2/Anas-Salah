import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Zap, Filter, Clock, ArrowRight, ChevronDown, Check, AlertTriangle, SearchX, ArrowLeft, QrCode, X } from 'lucide-react';
import QRCode from 'react-qr-code';

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allResults, setAllResults] = useState<any[]>([]);
  const [selectedStops, setSelectedStops] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('stops');
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [ticketRef, setTicketRef] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  const rawType = searchParams.get('type') || 'flight';
  const isFlight = rawType.toLowerCase().includes('flight');
  const typeLabel = isFlight ? 'Flights' : 'Buses';
  const typeLabelLower = isFlight ? 'flights' : 'buses';
  
  const origin = searchParams.get('origin') || 'Mogadishu';
  const dest = searchParams.get('dest') || 'Hargeisa';
  const depart = searchParams.get('depart') || '2026-10-24';
  const returnDate = searchParams.get('return');
  const pax = searchParams.get('pax') || '1';

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);
      setAllResults([]);
      setSelectedStops([]);
      
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate API failure condition
        if (origin.toLowerCase() === 'error' || dest.toLowerCase() === 'error') {
          throw new Error('Failed to connect to the booking server. Please check your connection and try again.');
        }

        const mockFlights = [
          { id: 1, operator: 'Jubba Airways', logo: '✈️', departTime: '08:00', arriveTime: '09:30', duration: '1h 30m', price: 120, stops: 'Direct', seat: '12A', rating: 4.2 },
          { id: 2, operator: 'Daallo Airlines', logo: '🛫', departTime: '10:15', arriveTime: '11:45', duration: '1h 30m', price: 135, stops: 'Direct', seat: '14C', rating: 3.8 },
          { id: 3, operator: 'African Express', logo: '🌍', departTime: '14:00', arriveTime: '16:00', duration: '2h 00m', price: 110, stops: '1 Stop', seat: '08F', rating: 4.5 },
        ];

        const mockBuses = [
          { id: 1, operator: 'Sahal Express', logo: '🚌', departTime: '06:00', arriveTime: '18:00', duration: '12h 00m', price: 45, stops: 'Direct', seat: '4', rating: 4.8 },
          { id: 2, operator: 'Horn Bus', logo: '🚍', departTime: '08:30', arriveTime: '21:30', duration: '13h 00m', price: 40, stops: '1 Rest Stop', seat: '12', rating: 4.1 },
        ];

        let filtered = isFlight ? mockFlights : mockBuses;

        // Simulate empty results condition
        if (origin.toLowerCase() === dest.toLowerCase() || dest.toLowerCase() === 'unknown') {
          filtered = [];
        }

        setAllResults(filtered);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [rawType, origin, dest, depart, pax]);

  const availableStops = Array.from(new Set(allResults.map(r => r.stops))) as string[];
  const displayedResults = allResults.filter(result => 
    selectedStops.length === 0 || selectedStops.includes(result.stops)
  ).sort((a, b) => {
    const getStopsWeight = (stops: string) => {
      if (stops.toLowerCase() === 'direct') return 0;
      const match = stops.match(/(\d+)/);
      return match ? parseInt(match[1], 10) : 99;
    };
    const getDurationMins = (duration: string) => {
      let mins = 0;
      const hMatch = duration.match(/(\d+)h/);
      const mMatch = duration.match(/(\d+)m/);
      if (hMatch) mins += parseInt(hMatch[1], 10) * 60;
      if (mMatch) mins += parseInt(mMatch[1], 10);
      return mins;
    };

    if (sortBy === 'price') {
      if (a.price !== b.price) return a.price - b.price;
      return getDurationMins(a.duration) - getDurationMins(b.duration);
    } else if (sortBy === 'stops') {
      const stopsDiff = getStopsWeight(a.stops) - getStopsWeight(b.stops);
      if (stopsDiff !== 0) return stopsDiff;
      return a.price - b.price;
    } else if (sortBy === 'duration') {
      const durDiff = getDurationMins(a.duration) - getDurationMins(b.duration);
      if (durDiff !== 0) return durDiff;
      return a.price - b.price;
    } else if (sortBy === 'rating') {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return a.price - b.price;
    }
    return 0;
  });

  const toggleStopFilter = (stop: string) => {
    setSelectedStops(prev => 
      prev.includes(stop) ? prev.filter(s => s !== stop) : [...prev, stop]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-20">
      <header className="fixed w-full left-0 top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" aria-label="SAHAL Home" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center" aria-hidden="true">
              <Zap className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold tracking-tighter text-slate-900">SAHAL</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm font-semibold text-slate-600 bg-slate-100 px-4 py-2 rounded-lg">
              <span>{origin}</span>
              <ArrowRight className="w-4 h-4" />
              <span>{dest}</span>
              <span className="mx-2 text-slate-300">|</span>
              <span>{depart}{returnDate ? ` - ${returnDate}` : ''}</span>
            </div>
            <Link to="/" className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">Modify</Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-28">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900 flex items-center gap-2"><Filter className="w-4 h-4" /> Filters</h3>
              <button 
                onClick={() => setSelectedStops([])}
                className="text-xs text-primary font-semibold hover:underline"
              >
                Reset
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3">Stops</h4>
                <div className="space-y-2">
                  {availableStops.length > 0 ? (
                    availableStops.map(stop => (
                      <label key={stop} className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedStops.includes(stop) ? 'bg-primary border-primary' : 'border-slate-300 bg-white'}`}>
                            {selectedStops.includes(stop) && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className="text-sm text-slate-600">{stop}</span>
                        </div>
                        <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={selectedStops.includes(stop)} 
                          onChange={() => toggleStopFilter(stop)} 
                        />
                      </label>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">No filters available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 space-y-4" aria-live="polite" aria-busy={isLoading}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-900">
              {isLoading ? 'Searching...' : error ? 'Search Failed' : `${displayedResults.length} ${typeLabel} found`}
            </h2>
            {!isLoading && !error && displayedResults.length > 0 && (
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto">
                <button 
                  onClick={() => setSortBy('price')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${sortBy === 'price' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Cheapest
                </button>
                <button 
                  onClick={() => setSortBy('duration')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${sortBy === 'duration' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Fastest
                </button>
                <button 
                  onClick={() => setSortBy('stops')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${sortBy === 'stops' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Direct First
                </button>
                <button 
                  onClick={() => setSortBy('rating')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${sortBy === 'rating' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Top Rated
                </button>
              </div>
            )}
          </div>

          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm animate-pulse flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-slate-200 rounded-xl shrink-0"></div>
                <div className="flex-1 w-full space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                  <div className="h-6 bg-slate-200 rounded w-1/2"></div>
                </div>
              </div>
            ))
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-12 text-center flex flex-col items-center shadow-sm">
              <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Oops! Something went wrong</h3>
              <p className="text-slate-600 mb-8 max-w-md">{error}</p>
              <button onClick={() => window.location.reload()} className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
                Try Again
              </button>
            </div>
          ) : allResults.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center shadow-sm">
              <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
                <div className="absolute inset-0 bg-slate-100 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 bg-slate-50 rounded-full"></div>
                <SearchX className="w-20 h-20 text-slate-300 relative z-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No routes found</h3>
              <p className="text-slate-500 mb-8 max-w-md">
                We couldn't find any {typeLabelLower} from <span className="font-semibold text-slate-700">{origin}</span> to <span className="font-semibold text-slate-700">{dest}</span> on <span className="font-semibold text-slate-700">{depart}{returnDate ? ` to ${returnDate}` : ''}</span>.
              </p>
              <div className="bg-slate-50 p-6 rounded-xl w-full max-w-md text-left border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-3">Try the following:</h4>
                <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                  <li>Check your spelling for the cities.</li>
                  <li>Try searching for a different date.</li>
                  <li>Broaden your search to nearby cities.</li>
                  <li>Switch between flights and buses.</li>
                </ul>
              </div>
              <Link to="/" className="mt-8 text-primary font-bold hover:text-primary/80 flex items-center gap-2 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Modify your search
              </Link>
            </div>
          ) : displayedResults.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center shadow-sm">
              <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 bg-primary/10 rounded-full"></div>
                <Filter className="w-20 h-20 text-primary relative z-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No matches for your filters</h3>
              <p className="text-slate-500 mb-8 max-w-md">
                We couldn't find any results matching your selected filters. Try adjusting them to see more options.
              </p>
              <button 
                onClick={() => setSelectedStops([])} 
                className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            displayedResults.map((result) => (
              <div key={result.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-center gap-6 group">
                <div className="w-16 h-16 bg-slate-50 rounded-xl shrink-0 flex items-center justify-center text-3xl border border-slate-100">
                  {result.logo}
                </div>
                
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-sm font-bold text-slate-500">{result.operator}</div>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">
                      ★ {result.rating}
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <div className="text-center md:text-left">
                      <div className="text-2xl font-extrabold text-slate-900">{result.departTime}</div>
                      <div className="text-sm font-medium text-slate-500">{origin.split(',')[0]}</div>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center px-4">
                      <div className="text-xs font-bold text-slate-400 mb-1">{result.duration}</div>
                      <div className="w-full flex items-center">
                        <div className="w-2 h-2 rounded-full border-2 border-slate-300"></div>
                        <div className="flex-1 h-px bg-slate-300 relative">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400 bg-white px-2 text-[10px] font-bold uppercase tracking-wider">
                            {result.stops}
                          </div>
                        </div>
                        <div className="w-2 h-2 rounded-full border-2 border-primary bg-primary"></div>
                      </div>
                    </div>

                    <div className="text-center md:text-right">
                      <div className="text-2xl font-extrabold text-slate-900">{result.arriveTime}</div>
                      <div className="text-sm font-medium text-slate-500">{dest.split(',')[0]}</div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-40 flex flex-col justify-center shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 text-center md:text-right">
                  <div className="text-3xl font-black text-primary mb-3">${result.price}</div>
                  <button 
                    onClick={() => {
                      setSelectedTicket(result);
                      setTicketRef(`SHL-${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
                    }}
                    className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-white font-bold py-3 rounded-xl transition-colors"
                  >
                    Select
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Ticket Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-primary p-6 text-white flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="bg-white/20 p-1.5 rounded-lg flex items-center justify-center">
                    <Zap className="text-white w-5 h-5" />
                  </div>
                  <span className="text-xl font-extrabold tracking-tighter">SAHAL</span>
                </div>
                <p className="text-primary-100 text-sm font-medium">Confirm Booking</p>
              </div>
              <button 
                onClick={() => setSelectedTicket(null)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Ticket Body */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl border border-slate-100">
                    {selectedTicket.logo}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Operator</p>
                    <p className="font-bold text-slate-900">{selectedTicket.operator}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date</p>
                  <p className="font-bold text-slate-900">{depart}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8 relative">
                <div className="w-1/3">
                  <p className="text-3xl font-black text-slate-900">{selectedTicket.departTime}</p>
                  <p className="text-sm font-medium text-slate-500">{origin}</p>
                </div>
                
                <div className="flex-1 flex flex-col items-center px-2">
                  <div className="text-[10px] font-bold text-slate-400 mb-1">{selectedTicket.duration}</div>
                  <div className="w-full flex items-center">
                    <div className="w-2 h-2 rounded-full border-2 border-slate-300"></div>
                    <div className="flex-1 border-t-2 border-dashed border-slate-300 relative">
                      {isFlight ? (
                        <ArrowRight className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 bg-white px-0.5" />
                      ) : (
                        <ArrowRight className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 bg-white px-0.5" />
                      )}
                    </div>
                    <div className="w-2 h-2 rounded-full border-2 border-primary bg-primary"></div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 mt-1">{selectedTicket.stops}</div>
                </div>

                <div className="w-1/3 text-right">
                  <p className="text-3xl font-black text-slate-900">{selectedTicket.arriveTime}</p>
                  <p className="text-sm font-medium text-slate-500">{dest}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Passenger</p>
                  <p className="font-bold text-slate-900">John Doe</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Seat</p>
                  <p className="font-bold text-slate-900">{selectedTicket.seat}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Class</p>
                  <p className="font-bold text-slate-900">Economy</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Gate/Platform</p>
                  <p className="font-bold text-slate-900">TBD</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center pt-6 border-t border-dashed border-slate-200">
                <button 
                  onClick={() => {
                    setIsBooking(true);
                    setTimeout(() => {
                      const newBooking = {
                        ...selectedTicket,
                        origin,
                        dest,
                        depart,
                        returnDate,
                        isFlight,
                        refNumber: ticketRef
                      };
                      const existingBookings = JSON.parse(localStorage.getItem('sahal_bookings') || '[]');
                      localStorage.setItem('sahal_bookings', JSON.stringify([newBooking, ...existingBookings]));
                      navigate('/bookings');
                    }, 1000);
                  }}
                  disabled={isBooking}
                  className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  {isBooking ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Confirming...
                    </>
                  ) : (
                    <>Confirm Booking - ${selectedTicket.price}</>
                  )}
                </button>
              </div>
            </div>
            
            {/* Decorative cutouts */}
            <div className="absolute left-0 top-[180px] -translate-x-1/2 w-6 h-6 bg-slate-900/60 rounded-full"></div>
            <div className="absolute right-0 top-[180px] translate-x-1/2 w-6 h-6 bg-slate-900/60 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
}
