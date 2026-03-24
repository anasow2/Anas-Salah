import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Ticket, Calendar, MapPin, PlaneLanding, Plane, Bus } from 'lucide-react';

export default function Bookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingToCancel, setBookingToCancel] = useState<number | null>(null);

  const confirmCancel = () => {
    if (bookingToCancel === null) return;
    
    const updatedBookings = [...bookings];
    updatedBookings.splice(bookingToCancel, 1);
    
    setBookings(updatedBookings);
    localStorage.setItem('sahal_bookings', JSON.stringify(updatedBookings));
    setBookingToCancel(null);
  };

  useEffect(() => {
    // Load bookings from local storage
    const savedBookings = localStorage.getItem('sahal_bookings');
    if (savedBookings) {
      try {
        setBookings(JSON.parse(savedBookings));
      } catch (e) {
        console.error('Failed to parse bookings', e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-20">
      {/* Navigation Bar */}
      <nav className="fixed w-full left-0 top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2 text-slate-900 hover:text-primary transition-colors font-bold">
              <ArrowLeft className="w-5 h-5" /> Back to Home
            </Link>
            <span className="text-xl font-extrabold tracking-tighter text-slate-900">My Bookings</span>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-primary/10 p-3 rounded-xl text-primary">
            <Ticket className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Your Trips</h1>
            <p className="text-slate-500 font-medium mt-1">Manage your upcoming and past bookings</p>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center flex flex-col items-center shadow-sm">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Ticket className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No bookings yet</h3>
            <p className="text-slate-500 mb-8 max-w-md">
              You haven't booked any trips yet. Start exploring our popular routes and book your next journey!
            </p>
            <Link to="/" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
              Explore Routes
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking, index) => (
              <div key={index} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
                <div className="bg-slate-900 text-white p-6 md:w-64 flex flex-col justify-between shrink-0 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4 text-primary-400">
                      {booking.isFlight ? <Plane className="w-5 h-5" /> : <Bus className="w-5 h-5" />}
                      <span className="text-sm font-bold uppercase tracking-wider">{booking.isFlight ? 'Flight' : 'Bus'} Ticket</span>
                    </div>
                    <div className="text-3xl font-black mb-1">{booking.departTime}</div>
                    <div className="text-slate-400 font-medium text-sm mb-6">{booking.depart || 'Upcoming'}</div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Booking Ref</div>
                    <div className="font-mono text-lg tracking-widest">{booking.refNumber}</div>
                  </div>

                  {/* Decorative background elements */}
                  <div className="absolute -right-12 -top-12 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                  <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-primary/20 rounded-full blur-2xl"></div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{booking.origin} to {booking.dest}</h3>
                        <p className="text-slate-500 font-medium flex items-center gap-2">
                          <span className="text-xl">{booking.logo}</span> {booking.operator}
                        </p>
                      </div>
                      <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-sm font-bold border border-emerald-100">
                        Confirmed
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Passenger</p>
                        <p className="font-bold text-slate-900 text-sm truncate">John Doe</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Seat</p>
                        <p className="font-bold text-slate-900 text-sm">{booking.seat || 'TBD'}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Class</p>
                        <p className="font-bold text-slate-900 text-sm">Economy</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Price</p>
                        <p className="font-bold text-slate-900 text-sm">${booking.price}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setBookingToCancel(index)}
                      className="px-6 py-2.5 bg-rose-50 text-rose-600 font-bold rounded-xl hover:bg-rose-100 transition-colors"
                    >
                      Cancel Booking
                    </button>
                    <Link 
                      to={`/ticket?data=${encodeURIComponent(btoa(encodeURIComponent(JSON.stringify(booking))))}`}
                      className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors"
                    >
                      View Boarding Pass
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Cancel Confirmation Modal */}
      {bookingToCancel !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Cancel Booking?</h3>
            <p className="text-slate-500 mb-8">
              Are you sure you want to cancel this booking? This action cannot be undone and refunds may take 3-5 business days.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setBookingToCancel(null)}
                className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Keep Booking
              </button>
              <button
                onClick={confirmCancel}
                className="px-6 py-3 rounded-xl font-bold bg-rose-500 text-white hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/25"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
