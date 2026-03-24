import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Scanner } from '@yudiel/react-qr-scanner';
import { ArrowLeft, AlertTriangle, QrCode, CheckCircle2, X } from 'lucide-react';

export default function Scan() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scannedTicket, setScannedTicket] = useState<any | null>(null);

  const handleScan = (detectedCodes: any) => {
    console.log('Scanned codes:', detectedCodes);
    if (scanned) return;

    let value = '';
    if (typeof detectedCodes === 'string') {
      value = detectedCodes;
    } else if (Array.isArray(detectedCodes) && detectedCodes.length > 0) {
      value = detectedCodes[0].rawValue;
    }

    if (value) {
      console.log('Scanned value:', value);
      try {
        // Check if it's a ticket URL
        if (value.includes('/ticket?data=')) {
          setScanned(true);
          const url = new URL(value, window.location.origin);
          navigate(url.pathname + url.search);
        } else {
          // Try to parse as JSON ticket details
          const parsed = JSON.parse(value);
          if (parsed && parsed.refNumber) {
            setScanned(true);
            setScannedTicket(parsed);
          } else {
            setError(`Scanned unrecognized code: ${value}`);
          }
        }
      } catch (err) {
        setError(`Invalid QR code content: ${value}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 relative">
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-white hover:text-primary font-bold transition-colors z-10">
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </Link>
      
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 bg-primary text-white text-center flex flex-col items-center">
          <div className="bg-white/20 p-3 rounded-full mb-3">
            <QrCode className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Scan Boarding Pass</h1>
          <p className="text-primary-100 text-sm mt-1">Position the QR code within the frame</p>
        </div>
        
        <div className="relative aspect-square bg-black">
          <Scanner 
            onScan={handleScan}
            onError={(err: any) => {
              const errMsg = err?.message || 'Camera error';
              if (errMsg.toLowerCase().includes('permission denied') || errMsg.toLowerCase().includes('not allowed')) {
                setError('Camera access denied. Please enable camera permissions. If you are using an iPhone or iPad, you may need to open this app in a new tab (using the arrow icon at the top right) to use the camera.');
              } else {
                setError(errMsg);
              }
            }}
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 flex items-start gap-3 border-t border-red-100">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}
        
        <div className="p-6 bg-slate-50 text-center">
          <p className="text-sm text-slate-500 font-medium">
            Scanning a valid SAHAL ticket QR code will automatically load your boarding pass details.
          </p>
        </div>
      </div>

      {/* Scanned Ticket Modal */}
      {scannedTicket && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
            <div className="bg-emerald-500 p-6 text-white flex justify-between items-start">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-white" />
                <div>
                  <h2 className="text-xl font-bold">Valid Ticket</h2>
                  <p className="text-emerald-100 text-sm">Successfully verified</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setScannedTicket(null);
                  setScanned(false);
                }}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Reference</p>
                  <p className="font-mono font-bold text-slate-900">{scannedTicket.refNumber}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Operator</p>
                  <p className="font-bold text-slate-900">{scannedTicket.operator}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Route</p>
                  <p className="font-bold text-slate-900">{scannedTicket.route}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Date</p>
                  <p className="font-bold text-slate-900">{scannedTicket.date}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Time</p>
                  <p className="font-bold text-slate-900">{scannedTicket.time}</p>
                </div>
                <div className="col-span-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Seat</p>
                  <p className="text-xl font-black text-primary">{scannedTicket.seat}</p>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setScannedTicket(null);
                  setScanned(false);
                }}
                className="w-full mt-4 bg-slate-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors"
              >
                Scan Another
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
