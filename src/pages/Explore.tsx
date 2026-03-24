import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Search, Bell, BadgeCheck, MapPin, History, Share2, Mail, Send } from 'lucide-react';

export default function Explore() {
  return (
    <div className="min-h-screen flex flex-col pt-[73px]">
      {/* Navigation Header */}
      <header className="fixed w-full left-0 top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 px-6 md:px-20 py-4 bg-white">
        <div className="flex items-center gap-8">
          <Link to="/" aria-label="SAHAL Home" className="flex items-center gap-2">
            <div className="flex items-center text-2xl font-extrabold tracking-tighter" aria-hidden="true">
              <span className="text-brand-blue">SA</span><span className="text-brand-green">HAL</span>
              <Zap className="text-brand-green ml-1 w-7 h-7 fill-brand-green" />
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-9">
            <Link to="/" className="text-slate-700 text-sm font-semibold hover:text-primary transition-colors">Home</Link>
            <Link to="/explore" className="text-slate-700 text-sm font-semibold hover:text-primary transition-colors">History</Link>
            <Link to="/explore" className="text-slate-700 text-sm font-semibold hover:text-primary transition-colors">Places</Link>
            <Link to="/explore" className="text-slate-700 text-sm font-semibold hover:text-primary transition-colors">Contact</Link>
          </nav>
        </div>
        <div className="flex flex-1 justify-end gap-4 items-center">
          <label className="hidden lg:flex flex-col min-w-40 h-10 max-w-64">
            <span className="sr-only">Search destinations</span>
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
              <div className="text-slate-400 flex border-none bg-slate-100 items-center justify-center pl-4 rounded-l-xl" aria-hidden="true">
                <Search className="w-5 h-5" />
              </div>
              <input 
                type="search" 
                aria-label="Search destinations"
                placeholder="Search destinations..." 
                className="flex w-full min-w-0 flex-1 border-none bg-slate-100 focus:ring-0 h-full placeholder:text-slate-500 px-4 rounded-r-xl text-base font-normal outline-none" 
              />
            </div>
          </label>
          <button aria-label="Notifications" className="flex items-center justify-center rounded-xl h-10 w-10 bg-slate-100 text-slate-700 hover:bg-primary/10 transition-colors">
            <Bell className="w-5 h-5" aria-hidden="true" />
          </button>
          <button 
            aria-label="User profile"
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10 border-2 border-primary" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDy7hCudRRAq2uiOzftE9x6LPFEv-vRGqQkYAK0yI4eIi7e_OpePlgo1_a-inftsEnIf8-RvfWv4p3ZPnC0V4Sz93W_QWQ4fiXdoqbXRG2MpbYMoSZvuwI3DjyKzg5mS12SSZ3WiDHS542LEqU9L1LNeLck8ODC7JPcc2IY0-NU_gfRGAj_ph0Ysu3H6hl9gCK5-6HJ1D4oN54Fgz2ptLz8w97rf2b1Zy41hIBZXh6DM1CXqLL2OlO1eW2zg7ddYt8YdjWfpEsRej8")' }}
          ></button>
        </div>
      </header>

      <main className="flex flex-1 justify-center py-8">
        <div className="flex flex-col max-w-[1200px] flex-1 px-4 md:px-10">
          {/* Hero Section */}
          <section className="mb-12">
            <div className="flex flex-col gap-6 md:gap-12 md:flex-row items-center bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100">
              <div 
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-2xl md:w-1/2 shadow-lg" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuApMKRAm8o3tfwgncyJAYWFlaycN7AxPrmGsYAo0COcvqCiD71oQwCXLykB4iEYrex_jHJU-ll0zhWzNi2DWjUauDY1ExbRQgXgQInrcbGA4ULHVhZZVLecfEJqes_TupT4W_U768BVkipA5ywD9BG_Niy-jftLkuEDSyyNFRet8r_YWsp_3wE4wNhTR-W9sK0mtzoPRcfoSAEZ6SMgWW8nbReYrSUqECWGpJeC1tr2qdJL7Qch4qmy_d1tjpfbGBdAx5CVWCzbIwI")' }}
              ></div>
              <div className="flex flex-col gap-6 md:w-1/2">
                <div className="flex flex-col gap-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold uppercase tracking-wider w-fit">
                    <BadgeCheck className="w-4 h-4" />
                    Official Travel Guide
                  </div>
                  <h1 className="text-slate-900 text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                    SAHAL – <span className="text-primary">Wax walba</span> si sahlan
                  </h1>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Experience the beauty and history of Muqdisho with simplicity and speed. Discover the heart of Somalia through our curated local experiences.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button className="flex min-w-[160px] items-center justify-center rounded-xl h-14 px-8 bg-primary text-white text-base font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all">
                    Explore Now
                  </button>
                  <button className="flex min-w-[160px] items-center justify-center rounded-xl h-14 px-8 bg-slate-100 text-slate-900 text-base font-bold hover:bg-slate-200 transition-all">
                    Learn History
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Beautiful Places Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-slate-900 text-2xl md:text-3xl font-bold tracking-tight px-4 border-l-4 border-primary">Beautiful Places</h2>
              <a href="#" className="text-primary font-semibold text-sm hover:underline">View All</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Place 1 */}
              <div className="group flex flex-col gap-3 bg-white p-3 rounded-2xl border border-slate-100 hover:shadow-xl transition-all">
                <div 
                  className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-xl overflow-hidden relative" 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAX6DNduj3pvGp2s9RexjN_34y5W0kXYNogxSHWyjqMCcRAiqVrhRAEev-IXw5mE076Deg6FjCX-nXh1nIUAoLSCcj3YM8NP3Tgjw1HZzHyOKTOm6tOFwo4DO5TzjovZ6GbAWBCs2GfWyB3FQ9b5spaHFMkWtFekHORUO_HBtk7MlPMojiAHU2WlcZbn1LtsbFpPnsaitZrbuVhqodGbUM2kz1m3MdBro1b9xobQQKk7KifCzbiG0NmWxjyHFccFE52bocgHv0b8OI")' }}
                >
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-primary shadow-sm">
                    Popular
                  </div>
                </div>
                <div className="px-2 pb-2">
                  <h3 className="text-slate-900 text-lg font-bold">Lido Beach</h3>
                  <p className="text-slate-500 text-sm">Stunning coastline and vibrant evening life.</p>
                  <div className="flex items-center gap-1 mt-3 text-brand-green">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs font-semibold">Abdiaziz District</span>
                  </div>
                </div>
              </div>
              
              {/* Place 2 */}
              <div className="group flex flex-col gap-3 bg-white p-3 rounded-2xl border border-slate-100 hover:shadow-xl transition-all">
                <div 
                  className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-xl overflow-hidden" 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDlf6_53-Q3AVu26wDK0s9YwUDxG5uYxT_EEUcrpjR3o7B6XO1562oT_e8if6DZ_RE8Oq8u5LjCalrzM9g-uQOFmKdWYDDVjZM_I8KYzwSfABSziyylENnmUMAmlQ0pyH-Vf4cEjCTL0mTM5g3u_s23wMOPum4bWnMvsW-Lm9DKjshhBUUthNMM7-jP-EMguZi-MzV00am6dbkEmrV-6E4NamPnNSnos22Vyvr6dWFaYpKoi-6g8vSZHvJe48fwSuFc9YRYYuQgV1k")' }}
                ></div>
                <div className="px-2 pb-2">
                  <h3 className="text-slate-900 text-lg font-bold">Liido Marine</h3>
                  <p className="text-slate-500 text-sm">Professional water sports and boat excursions.</p>
                  <div className="flex items-center gap-1 mt-3 text-brand-green">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs font-semibold">Coastal Area</span>
                  </div>
                </div>
              </div>

              {/* Place 3 */}
              <div className="group flex flex-col gap-3 bg-white p-3 rounded-2xl border border-slate-100 hover:shadow-xl transition-all">
                <div 
                  className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-xl overflow-hidden" 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCJNRojM867Y6KmUC9_snIxRhxYEKVgPBSsDJ_-b9dAgDEKqUUEs6xd0LXG14v8LuimENrnJGqbeboDbwx-KpDxALXKQOnFH7x52VvczEsWDMZE2sIHVrVq1Z18M7Upfp3t0v3_Zga8y9_jBWby7px2JelbkzOUd9n9fDzoV8HYEQDve55HDGOpTzT9Q1dMhuTBJHwM5PLMVwpKKLPAqV8OtnMDXxVinLVe1henaxvuwZBY7UJk3rLnWp3ugV0Kr4udjgGrvBzyKDE")' }}
                ></div>
                <div className="px-2 pb-2">
                  <h3 className="text-slate-900 text-lg font-bold">Peace Park</h3>
                  <p className="text-slate-500 text-sm">Quiet greenery and family recreation spaces.</p>
                  <div className="flex items-center gap-1 mt-3 text-brand-green">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs font-semibold">Hamar Weyne</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* History Section */}
          <section className="mb-12">
            <div className="bg-brand-blue rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">History of the City</h2>
                <p className="text-slate-200 text-lg leading-relaxed mb-8">
                  Mogadishu, known locally as Hamar, is the capital and most populous city of Somalia. Located in the coastal Banadir region on the Indian Ocean, the city has served as an important port for millennia.
                </p>
                <button className="bg-brand-green hover:bg-brand-green/90 text-white font-bold py-3 px-8 rounded-xl transition-all">
                  Discover More
                </button>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                <History className="w-[200px] h-[200px]" />
              </div>
            </div>
          </section>

          {/* Asad Hagio Section */}
          <section className="mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-3xl border border-slate-100">
              <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-2xl overflow-hidden border-4 border-slate-100">
                <div 
                  className="w-full h-full bg-center bg-no-repeat bg-cover" 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA7vyOngNMYin5MPdz-U5VwIcxIps6xhUKjRja8JyIaF9vO1ozAhjEGJeFxG2GIs1_ry6c95ZMcTKb2U1K6d_zJnVWtCkH5ZAOftHTzCer5tWLzqby29GG-TdeAWdlymmXIgrMhvYLaRly6IcNK5g9TxPSd9TLdNoAmor_Ik1Z-q2bCV_G4qi-LiFfFwqSuxc2T6CNVt0lc2djo1j1HqDYNYKYCTtaQT8s2AZutbta7kOND-b5qFTrt2V93qOpehQjpl0mpFIOESmA")' }}
                ></div>
              </div>
              <div className="flex flex-col gap-4 text-center md:text-left">
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl font-bold text-slate-900">Asad Hagio</h3>
                  <p className="text-primary font-semibold">City Historian & Cultural Guide</p>
                </div>
                <p className="text-slate-600 italic">
                  "Exploring Mogadishu isn't just about the places; it's about the stories that have shaped this resilient city over centuries. Join me in uncovering the hidden gems of our heritage."
                </p>
                <div className="flex justify-center md:justify-start gap-4">
                  <button aria-label="Share profile" className="text-slate-400 hover:text-primary transition-colors"><Share2 className="w-5 h-5" aria-hidden="true" /></button>
                  <button aria-label="Email Asad Hagio" className="text-slate-400 hover:text-primary transition-colors"><Mail className="w-5 h-5" aria-hidden="true" /></button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-6 md:px-20 mt-auto">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center text-xl font-extrabold tracking-tighter mb-4">
              <span className="text-brand-blue">SA</span><span className="text-brand-green">HAL</span>
              <Zap className="text-brand-green ml-1 w-5 h-5 fill-brand-green" />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Simplifying your journey through the historical heart of Somalia.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">Destinations</a></li>
              <li><a href="#" className="hover:text-primary">History</a></li>
              <li><a href="#" className="hover:text-primary">Guides</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-primary">Contact Support</a></li>
              <li><a href="#" className="hover:text-primary">Safety Info</a></li>
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Use</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Stay Updated</h4>
            <div className="flex gap-2">
              <input type="email" aria-label="Email address for newsletter" placeholder="Email" className="w-full bg-slate-100 border-none rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none px-3" />
              <button aria-label="Subscribe to newsletter" className="bg-primary p-2 rounded-lg text-white">
                <Send className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-slate-100 text-center text-slate-400 text-xs">
          © 2024 SAHAL. All rights reserved. Wax walba si sahlan.
        </div>
      </footer>
    </div>
  );
}
