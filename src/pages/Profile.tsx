import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, CreditCard, Clock, Save, Plus, Trash2, Ticket } from 'lucide-react';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('personal');
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+252 61 234 5678'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/25' },
    { id: 2, type: 'EVC Plus', phone: '+252 61 234 5678' }
  ]);

  useEffect(() => {
    // Load personal info
    const savedInfo = localStorage.getItem('sahal_profile');
    if (savedInfo) {
      setPersonalInfo(JSON.parse(savedInfo));
    }

    // Load bookings
    const savedBookings = localStorage.getItem('sahal_bookings');
    if (savedBookings) {
      try {
        setBookings(JSON.parse(savedBookings));
      } catch (e) {
        console.error('Failed to parse bookings', e);
      }
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('sahal_profile', JSON.stringify(personalInfo));
      setIsSaving(false);
    }, 800);
  };

  const removePaymentMethod = (id: number) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-20">
      {/* Navigation Bar */}
      <nav className="fixed w-full left-0 top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2 text-slate-900 hover:text-primary transition-colors font-bold">
              <ArrowLeft className="w-5 h-5" /> Back to Home
            </Link>
            <span className="text-xl font-extrabold tracking-tighter text-slate-900">My Profile</span>
            <div className="w-24"></div> {/* Spacer */}
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm sticky top-28">
            <div className="flex items-center gap-4 mb-8 p-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-2xl">
                {personalInfo.firstName[0]}{personalInfo.lastName[0]}
              </div>
              <div>
                <h2 className="font-bold text-slate-900">{personalInfo.firstName} {personalInfo.lastName}</h2>
                <p className="text-xs text-slate-500">Traveler</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('personal')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === 'personal' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <User className="w-5 h-5" /> Personal Info
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === 'bookings' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <Clock className="w-5 h-5" /> Booking History
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === 'payments' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <CreditCard className="w-5 h-5" /> Payment Methods
              </button>
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === 'personal' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Personal Information</h3>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      value={personalInfo.lastName}
                      onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 disabled:opacity-70"
                  >
                    {isSaving ? 'Saving...' : <><Save className="w-5 h-5" /> Save Changes</>}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Booking History</h3>
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Ticket className="w-8 h-8 text-slate-300" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">No past bookings</h4>
                  <p className="text-slate-500">You haven't made any bookings yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all bg-slate-50/50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-2xl shadow-sm">
                          {booking.logo}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{booking.origin} to {booking.dest}</h4>
                          <p className="text-sm text-slate-500">{booking.depart || 'Upcoming'} • {booking.operator}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-900">${booking.price}</div>
                        <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md mt-1 inline-block">Confirmed</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Payment Methods</h3>
                <button className="flex items-center gap-2 text-primary font-bold hover:bg-primary/10 px-4 py-2 rounded-xl transition-colors">
                  <Plus className="w-5 h-5" /> Add New
                </button>
              </div>
              
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:shadow-sm transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{method.type}</h4>
                        <p className="text-sm text-slate-500">
                          {method.last4 ? `**** **** **** ${method.last4}` : method.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {method.expiry && <span className="text-sm text-slate-500 font-medium">Expires {method.expiry}</span>}
                      <button 
                        onClick={() => removePaymentMethod(method.id)}
                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        aria-label="Remove payment method"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
