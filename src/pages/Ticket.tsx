import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, ArrowLeft, AlertTriangle, QrCode, X } from 'lucide-react';
import QRCode from 'react-qr-code';
import { Scanner } from '@yudiel/react-qr-scanner';

export default function Ticket() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);

  useEffect(() => {
    try {
      let dataParam = searchParams.get('data');
      if (!dataParam) throw new Error('No ticket data found');
      
      // Fix spaces that should be pluses (in case of old URLs or improper encoding)
      dataParam = dataParam.replace(/ /g, '+');
      
      const decoded = JSON.parse(decodeURIComponent(atob(dataParam)));
      setTicketData(decoded);
    } catch (err) {
      setError('Invalid or corrupted ticket data');
    }
  }, [searchParams]);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Invalid Ticket</h1>
        <p className="text-slate-500 mb-6">{error}</p>
        <Link to="/" className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  if (!ticketData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  const { operator, logo, departTime, arriveTime, duration, stops, seat, origin, dest, depart, refNumber } = ticketData;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-slate-500 hover:text-primary font-bold transition-colors">
        <ArrowLeft className="w-5 h-5" /> Home
      </Link>
      
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Modal Header */}
        <div className="bg-primary p-6 text-white flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-white/20 p-1.5 rounded-lg flex items-center justify-center">
                <Zap className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tighter">SAHAL</span>
            </div>
            <p className="text-primary-100 text-sm font-medium">Boarding Pass</p>
          </div>
        </div>

        {/* Ticket Body */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl border border-slate-100">
                {logo}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Operator</p>
                <p className="font-bold text-slate-900">{operator}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date</p>
              <p className="font-bold text-slate-900">{depart}</p>
            </div>
          </div>

          <div className="flex justify-between items-center mb-8 relative">
            <div className="w-1/3">
              <p className="text-3xl font-black text-slate-900">{departTime}</p>
              <p className="text-sm font-medium text-slate-500">{origin}</p>
            </div>
            
            <div className="flex-1 flex flex-col items-center px-2">
              <div className="text-[10px] font-bold text-slate-400 mb-1">{duration}</div>
              <div className="w-full flex items-center">
                <div className="w-2 h-2 rounded-full border-2 border-slate-300"></div>
                <div className="flex-1 border-t-2 border-dashed border-slate-300 relative">
                  <ArrowRight className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 bg-white px-0.5" />
                </div>
                <div className="w-2 h-2 rounded-full border-2 border-primary bg-primary"></div>
              </div>
              <div className="text-[10px] font-bold text-slate-400 mt-1">{stops}</div>
            </div>

            <div className="w-1/3 text-right">
              <p className="text-3xl font-black text-slate-900">{arriveTime}</p>
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
              <p className="font-bold text-slate-900">{seat}</p>
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
            <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 mb-2">
              <QRCode 
                value={JSON.stringify({
                  operator,
                  route: `${origin} to ${dest}`,
                  date: depart,
                  time: departTime,
                  seat,
                  refNumber
                })} 
                size={192} 
              />
            </div>
            <p className="text-xs font-mono text-slate-500 tracking-widest mb-6">{refNumber}</p>
            
            <Link 
              to="/scan" 
              className="w-full bg-slate-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
            >
              <QrCode className="w-5 h-5" />
              Scan Another Ticket
            </Link>
          </div>
        </div>
        
        {/* Decorative cutouts */}
        <div className="absolute left-0 top-[180px] -translate-x-1/2 w-6 h-6 bg-slate-50 rounded-full"></div>
        <div className="absolute right-0 top-[180px] translate-x-1/2 w-6 h-6 bg-slate-50 rounded-full"></div>
      </div>
    </div>
  );
}
