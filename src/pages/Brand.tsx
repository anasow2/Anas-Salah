import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight, Palette, Type, Layout, Image as ImageIcon } from 'lucide-react';

export default function Brand() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-20">
      {/* Header */}
      <header className="fixed w-full left-0 top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" aria-label="SAHAL Home" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center" aria-hidden="true">
              <Zap className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold tracking-tighter text-slate-900">SAHAL</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Back to App</Link>
            <a href="#download" className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold px-5 py-2 rounded-lg transition-colors">
              Download Assets
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Brand Identity Guidelines
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            The SAHAL brand is built on speed, reliability, and simplicity. These guidelines ensure our visual identity remains consistent across all touchpoints.
          </p>
        </div>

        {/* Logo Section */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Layout className="w-5 h-5" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">The Logo</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Primary Logo */}
            <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
              <div className="flex items-center gap-3 mb-8 scale-150">
                <div className="bg-primary p-2 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                  <Zap className="text-white w-8 h-8" />
                </div>
                <span className="text-4xl font-extrabold tracking-tighter text-slate-900">SAHAL</span>
              </div>
              <p className="text-sm text-slate-500 font-medium">Primary Logo (Light Backgrounds)</p>
            </div>

            {/* Inverted Logo */}
            <div className="bg-slate-900 p-12 rounded-3xl border border-slate-800 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
              <div className="flex items-center gap-3 mb-8 scale-150">
                <div className="bg-white p-2 rounded-xl flex items-center justify-center shadow-lg shadow-white/10">
                  <Zap className="text-primary w-8 h-8" />
                </div>
                <span className="text-4xl font-extrabold tracking-tighter text-white">SAHAL</span>
              </div>
              <p className="text-sm text-slate-400 font-medium">Inverted Logo (Dark Backgrounds)</p>
            </div>
          </div>
        </section>

        {/* Color Palette Section */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Palette className="w-5 h-5" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Color Palette</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Primary */}
            <div className="group">
              <div className="h-32 bg-primary rounded-2xl mb-4 shadow-sm border border-black/5 group-hover:scale-105 transition-transform origin-bottom"></div>
              <h3 className="font-bold text-slate-900 mb-1">Sahal Blue</h3>
              <p className="text-sm text-slate-500 font-mono mb-1">#0d93f2</p>
              <p className="text-xs text-slate-400">Primary brand color. Used for main actions, highlights, and the logo mark.</p>
            </div>

            {/* Brand Blue */}
            <div className="group">
              <div className="h-32 bg-brand-blue rounded-2xl mb-4 shadow-sm border border-black/5 group-hover:scale-105 transition-transform origin-bottom"></div>
              <h3 className="font-bold text-slate-900 mb-1">Deep Navy</h3>
              <p className="text-sm text-slate-500 font-mono mb-1">#003366</p>
              <p className="text-xs text-slate-400">Secondary brand color. Used for dark backgrounds and high-contrast text.</p>
            </div>

            {/* Brand Green */}
            <div className="group">
              <div className="h-32 bg-brand-green rounded-2xl mb-4 shadow-sm border border-black/5 group-hover:scale-105 transition-transform origin-bottom"></div>
              <h3 className="font-bold text-slate-900 mb-1">Success Green</h3>
              <p className="text-sm text-slate-500 font-mono mb-1">#28a745</p>
              <p className="text-xs text-slate-400">Accent color. Used for success states, verifications, and positive indicators.</p>
            </div>

            {/* Background Light */}
            <div className="group">
              <div className="h-32 bg-background-light rounded-2xl mb-4 shadow-sm border border-slate-200 group-hover:scale-105 transition-transform origin-bottom"></div>
              <h3 className="font-bold text-slate-900 mb-1">Base Gray</h3>
              <p className="text-sm text-slate-500 font-mono mb-1">#f5f7f8</p>
              <p className="text-xs text-slate-400">Background color. Used as the canvas for the application interface.</p>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Type className="w-5 h-5" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Typography</h2>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              {/* Display Font */}
              <div className="p-10">
                <div className="mb-8">
                  <span className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2 block">Display Typeface</span>
                  <h3 className="text-3xl font-extrabold text-slate-900 font-display">Plus Jakarta Sans</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-4xl font-extrabold text-slate-900 mb-1 font-display">Aa</p>
                    <p className="text-sm text-slate-500">ExtraBold 800</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-slate-900 mb-1 font-display">Aa</p>
                    <p className="text-sm text-slate-500">Bold 700</p>
                  </div>
                  <div>
                    <p className="text-4xl font-semibold text-slate-900 mb-1 font-display">Aa</p>
                    <p className="text-sm text-slate-500">SemiBold 600</p>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-slate-100">
                  <p className="text-2xl font-bold text-slate-900 font-display">Wax walba si sahlan.</p>
                  <p className="text-xs text-slate-400 mt-2">Used for all headings and large display text.</p>
                </div>
              </div>

              {/* Body Font */}
              <div className="p-10">
                <div className="mb-8">
                  <span className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2 block">Body Typeface</span>
                  <h3 className="text-3xl font-bold text-slate-900 font-sans">Inter</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-4xl font-bold text-slate-900 mb-1 font-sans">Aa</p>
                    <p className="text-sm text-slate-500">Bold 700</p>
                  </div>
                  <div>
                    <p className="text-4xl font-medium text-slate-900 mb-1 font-sans">Aa</p>
                    <p className="text-sm text-slate-500">Medium 500</p>
                  </div>
                  <div>
                    <p className="text-4xl font-normal text-slate-900 mb-1 font-sans">Aa</p>
                    <p className="text-sm text-slate-500">Regular 400</p>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-slate-100">
                  <p className="text-base text-slate-600 font-sans leading-relaxed">
                    The fastest way to book your next journey across Somalia and beyond. Experience the beauty and history of Muqdisho with simplicity and speed.
                  </p>
                  <p className="text-xs text-slate-400 mt-2">Used for all body copy, UI elements, and paragraphs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Imagery Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Imagery Style</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden aspect-square relative group">
              <img src="https://images.unsplash.com/photo-1544016768-982d1554f0b9?auto=format&fit=crop&q=80" alt="Vibrant" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-bold">Vibrant & Authentic</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square relative group">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwX0PNRg4ZmF7ZucQSD-8kE129xIfYdW44frbS0mNKKl9cMfpa2e6qdfmfnKfUGwooNJDdL4P2nsfVZzfq3Hn4IEQrEsXC5S5xJGZyRD9nNlC7iJ1lzUkNSVOe1x6TJWXeEbdASp9LEhlV8oec1QtmoZLAQx_v4f0SLM2vsw87Iizg30kxHWexXCApfWqlTIv-1-w88AHxWWDZQ2epgaZTGbYIr8E0iYOpy9wIdSj1PJmIZzXh96b3diTlnxBhcpAsheN66cR20sQ" alt="Places" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-bold">Local Destinations</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square relative group">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7vyOngNMYin5MPdz-U5VwIcxIps6xhUKjRja8JyIaF9vO1ozAhjEGJeFxG2GIs1_ry6c95ZMcTKb2U1K6d_zJnVWtCkH5ZAOftHTzCer5tWLzqby29GG-TdeAWdlymmXIgrMhvYLaRly6IcNK5g9TxPSd9TLdNoAmor_Ik1Z-q2bCV_G4qi-LiFfFwqSuxc2T6CNVt0lc2djo1j1HqDYNYKYCTtaQT8s2AZutbta7kOND-b5qFTrt2V93qOpehQjpl0mpFIOESmA" alt="People" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-bold">Real People</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
