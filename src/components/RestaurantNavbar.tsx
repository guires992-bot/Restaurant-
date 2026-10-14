import React from 'react';
import { Calendar, Phone, Utensils, Gift } from 'lucide-react';

interface RestaurantNavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenReservation: () => void;
  onOpenGiftModal: () => void;
  confirmedReservationCount: number;
  onViewMyBooking: () => void;
}

export const RestaurantNavbar: React.FC<RestaurantNavbarProps> = ({
  activeSection,
  setActiveSection,
  onOpenReservation,
  onOpenGiftModal,
  confirmedReservationCount,
  onViewMyBooking,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#161413]/95 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => setActiveSection('home')}
          className="text-xl sm:text-2xl font-serif font-bold tracking-[0.15em] uppercase text-[#F5F2EB] hover:text-[#D97236] transition-colors cursor-pointer shrink-0 whitespace-nowrap text-left"
        >
          Maison Sienne
        </button>

        {/* Zone 2: 4-5 Navigation Links (single line, no wrap) */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-stone-300">
          <button
            onClick={() => setActiveSection('home')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors cursor-pointer ${
              activeSection === 'home'
                ? 'border-[#C25E2E] text-white font-bold'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            L'Esprit & Décor
          </button>
          <button
            onClick={() => setActiveSection('carte')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors cursor-pointer ${
              activeSection === 'carte'
                ? 'border-[#C25E2E] text-white font-bold'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            La Carte & Menus
          </button>
          <button
            onClick={() => setActiveSection('espaces')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors cursor-pointer ${
              activeSection === 'espaces'
                ? 'border-[#C25E2E] text-white font-bold'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            Les Espaces
          </button>
          <button
            onClick={() => setActiveSection('privatisation')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors cursor-pointer ${
              activeSection === 'privatisation'
                ? 'border-[#C25E2E] text-white font-bold'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            Privatisation
          </button>
          <button
            onClick={onOpenGiftModal}
            className="flex items-center gap-1.5 whitespace-nowrap shrink-0 pb-1 border-b-2 border-transparent text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <Gift className="w-3.5 h-3.5 text-amber-400" />
            <span>Bons Cadeaux</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {confirmedReservationCount > 0 && (
            <button
              onClick={onViewMyBooking}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-amber-300 bg-stone-900 border border-stone-700 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Ma Réservation ({confirmedReservationCount})</span>
            </button>
          )}

          <a
            href="tel:+33142685500"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-300 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-stone-400" />
            <span className="tabular-nums">01 42 68 55 00</span>
          </a>

          <button
            onClick={onOpenReservation}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#C25E2E] hover:bg-[#D97236] rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer hover:shadow-orange-950/40"
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Réserver une Table</span>
          </button>
        </div>
      </div>

      {/* Mobile sub-bar */}
      <div className="md:hidden flex items-center justify-between overflow-x-auto px-4 py-2.5 border-t border-stone-800 text-xs uppercase tracking-wider font-semibold text-stone-400 gap-4 no-scrollbar">
        <button
          onClick={() => setActiveSection('home')}
          className={`whitespace-nowrap shrink-0 ${activeSection === 'home' ? 'text-white font-bold border-b border-[#C25E2E] pb-0.5' : ''}`}
        >
          L'Esprit
        </button>
        <button
          onClick={() => setActiveSection('carte')}
          className={`whitespace-nowrap shrink-0 ${activeSection === 'carte' ? 'text-white font-bold border-b border-[#C25E2E] pb-0.5' : ''}`}
        >
          La Carte
        </button>
        <button
          onClick={() => setActiveSection('espaces')}
          className={`whitespace-nowrap shrink-0 ${activeSection === 'espaces' ? 'text-white font-bold border-b border-[#C25E2E] pb-0.5' : ''}`}
        >
          Les Espaces
        </button>
        <button
          onClick={() => setActiveSection('privatisation')}
          className={`whitespace-nowrap shrink-0 ${activeSection === 'privatisation' ? 'text-white font-bold border-b border-[#C25E2E] pb-0.5' : ''}`}
        >
          Privatisation
        </button>
        <button
          onClick={onOpenGiftModal}
          className="whitespace-nowrap shrink-0 text-amber-300"
        >
          Bons Cadeaux
        </button>
      </div>
    </header>
  );
};
