/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ReservationData, DiningAreaId } from './types/restaurant';
import { RestaurantNavbar } from './components/RestaurantNavbar';
import { RestaurantHero } from './components/RestaurantHero';
import { RestaurantMenu } from './components/RestaurantMenu';
import { AtmosphereShowcase } from './components/AtmosphereShowcase';
import { PrivateEventsSection } from './components/PrivateEventsSection';
import { RestaurantFooter } from './components/RestaurantFooter';
import { ReservationModal } from './components/ReservationModal';
import { GiftVoucherSection } from './components/GiftVoucherSection';
import { MyBookingsModal } from './components/MyBookingsModal';
import { Award, Quote } from 'lucide-react';

const INITIAL_RESERVATION: ReservationData = {
  id: 'MS-7821',
  date: '2026-10-24',
  service: 'diner',
  time: '20h00',
  guests: 2,
  area: 'banquette-sienne',
  customerName: 'Claire & Julien',
  email: 'julien@famille.fr',
  phone: '06 20 40 60 80',
  specialOccasion: 'Anniversaire de mariage',
  status: 'confirmed',
  createdAt: new Date().toISOString(),
};

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');

  // Modals state
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);

  // Reservation prefill
  const [bookingPrefill, setBookingPrefill] = useState<{
    guests?: number;
    date?: string;
    service?: 'dejeuner' | 'diner';
    area?: DiningAreaId;
  }>({
    guests: 2,
    service: 'diner',
    area: 'banquette-sienne',
  });

  // Saved reservations
  const [reservations, setReservations] = useState<ReservationData[]>(() => {
    try {
      const saved = localStorage.getItem('sienne_reservations');
      return saved ? JSON.parse(saved) : [INITIAL_RESERVATION];
    } catch {
      return [INITIAL_RESERVATION];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sienne_reservations', JSON.stringify(reservations));
    } catch {
      // ignore
    }
  }, [reservations]);

  const handleQuickBook = (
    guests: number,
    date: string,
    service: 'dejeuner' | 'diner'
  ) => {
    setBookingPrefill((prev) => ({ ...prev, guests, date, service }));
    setIsReservationOpen(true);
  };

  const handleSelectAreaForBooking = (areaId: DiningAreaId) => {
    setBookingPrefill((prev) => ({ ...prev, area: areaId }));
    setIsReservationOpen(true);
  };

  const handleConfirmReservation = (newRes: ReservationData) => {
    setReservations((prev) => [newRes, ...prev]);
  };

  const handleCancelReservation = (id: string) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#141312] text-stone-200 flex flex-col font-sans selection:bg-[#C25E2E]/40 selection:text-white">
      {/* Navbar */}
      <RestaurantNavbar
        activeSection={activeSection}
        setActiveSection={scrollToSection}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenGiftModal={() => setIsGiftModalOpen(true)}
        confirmedReservationCount={reservations.length}
        onViewMyBooking={() => setIsMyBookingsOpen(true)}
      />

      <main className="flex-1 space-y-12 sm:space-y-20">
        {/* Hero Section with Interior Design Inspiration */}
        <RestaurantHero
          onQuickBook={handleQuickBook}
          onExploreMenu={() => scrollToSection('carte')}
          onExploreSpaces={() => scrollToSection('espaces')}
        />

        {/* Architecture & Ambiance Showcase (Inspired by the Photo) */}
        <AtmosphereShowcase
          onSelectAreaForBooking={handleSelectAreaForBooking}
        />

        {/* Interactive Menu Gastronomique */}
        <RestaurantMenu
          onOpenReservation={() => setIsReservationOpen(true)}
        />

        {/* Editorial Press & Michelin Review Strip */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="p-8 sm:p-12 bg-gradient-to-br from-[#1E1B19] to-[#161413] rounded-3xl border border-stone-800 shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="flex items-center justify-center gap-2 text-amber-400">
                <Award className="w-5 h-5 text-[#D97236]" />
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-stone-300">
                  L’Avis du Guide Gastronomique 2026
                </span>
              </div>

              <div className="relative">
                <Quote className="w-10 h-10 text-stone-700/50 absolute -top-4 -left-4 -z-0" />
                <blockquote className="font-serif text-xl sm:text-2xl text-stone-100 italic leading-relaxed relative z-10 text-balance">
                  « Posé sur de généreuses banquettes en cuir terracotta, bercé par le halo doré des suspensions de verre et des claustras en chêne, on déguste ici une partition française de haute volée. Une adresse contemporaine remarquable. »
                </blockquote>
              </div>

              <div className="text-xs text-stone-400 border-t border-stone-800/80 pt-4 flex items-center justify-center gap-3">
                <span className="font-bold text-white">Le Carnet des Bonnes Tables</span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-400 font-semibold">Table Coup de Cœur de l'Année</span>
              </div>
            </div>
          </div>
        </section>

        {/* Privatisation & Événements Privés */}
        <PrivateEventsSection />
      </main>

      {/* Footer */}
      <RestaurantFooter
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenGiftModal={() => setIsGiftModalOpen(true)}
        onNavigate={scrollToSection}
      />

      {/* Interactive Reservation Flow Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        onConfirmReservation={handleConfirmReservation}
        prefillGuests={bookingPrefill.guests}
        prefillDate={bookingPrefill.date}
        prefillService={bookingPrefill.service}
        prefillArea={bookingPrefill.area}
      />

      {/* Gift Voucher Customization Modal */}
      <GiftVoucherSection
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
      />

      {/* User Bookings Management Modal */}
      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        reservations={reservations}
        onCancelReservation={handleCancelReservation}
      />
    </div>
  );
}
