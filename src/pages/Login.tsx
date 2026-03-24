import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-24 bg-white">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <Link to="/" aria-label="SAHAL Home" className="flex md:hidden items-center gap-2 mb-10 w-fit">
            <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center" aria-hidden="true">
              <Zap className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tighter text-slate-900">SAHAL</span>
          </Link>

          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Welcome Back</h2>
            <p className="text-slate-500 font-medium">Please enter your details to sign in.</p>
          </div>

          <form className="space-y-5">
            <div className="space-y-4">
              <div className="group">
                <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary w-5 h-5 transition-colors" aria-hidden="true" />
                  <input 
                    id="email"
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 font-medium outline-none transition-all" 
                  />
                </div>
              </div>

              <div className="group">
                <label htmlFor="password" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary w-5 h-5 transition-colors" aria-hidden="true" />
                  <input 
                    id="password"
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 font-medium outline-none transition-all" 
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary/20" 
                />
                <label htmlFor="remember" className="text-sm text-slate-600 font-medium">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm font-bold text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <button 
              type="button" 
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 group"
            >
              Sign In <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-600 font-medium">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary font-bold hover:underline">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image & Branding */}
      <div className="hidden md:flex md:w-1/2 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-brand-blue/90 to-primary/80 z-10 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_Somalia.svg')] bg-cover bg-center opacity-50"></div>
        
        <div className="relative z-20 flex flex-col justify-between p-12 w-full h-full">
          <div className="flex justify-end w-full">
            <Link to="/" aria-label="SAHAL Home" className="flex items-center gap-2 w-fit">
              <div className="bg-white p-2 rounded-xl flex items-center justify-center shadow-lg shadow-black/10" aria-hidden="true">
                <Zap className="text-primary w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold tracking-tighter text-white">SAHAL</span>
            </Link>
          </div>

          <div className="mb-12 text-right">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Your next adventure awaits.
            </h1>
            <p className="text-white/80 text-lg font-medium max-w-md ml-auto">
              Sign in to manage your bookings, explore new destinations, and travel with ease.
            </p>
          </div>

          <div className="flex items-center justify-end gap-4 text-white/60 text-sm">
            <span>© 2023 SAHAL</span>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </div>
  );
}
