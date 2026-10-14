import React, { useState } from 'react';
import { Calendar, Users, Clock, Award, Sparkles, ArrowRight } from 'lucide-react';

interface RestaurantHeroProps {
  onQuickBook: (guests: number, date: string, service: 'dejeuner' | 'diner') => void;
  onExploreMenu: () => void;
  onExploreSpaces: () => void;
}

export const RestaurantHero: React.FC<RestaurantHeroProps> = ({
  onQuickBook,
  onExploreMenu,
  onExploreSpaces,
}) => {
  const [quickGuests, setQuickGuests] = useState<number>(2);
  const [quickDate, setQuickDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [quickService, setQuickService] = useState<'dejeuner' | 'diner'>('diner');

  const handleMiniSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickBook(quickGuests, quickDate, quickService);
  };

  return (
    <section className="relative overflow-hidden border-b border-stone-800 bg-[#161413]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Editorial & Concept */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#D97236]">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Restaurant Gastronomique & Bar Feutré</span>
                <span aria-hidden="true" className="text-stone-600">·</span>
                <span className="text-stone-400 font-normal">Paris 8e</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F5F2EB] tracking-tight leading-[1.15] text-balance">
                L’élégance du cuir sienne, <br className="hidden sm:inline" />
                la lueur de l'ambre, <br className="hidden sm:inline" />
                l’émotion du goût.
              </h1>

              <p className="text-base sm:text-lg text-stone-300 font-normal max-w-xl leading-relaxed">
                Entre boiseries géométriques en chêne clair, confort velouté des banquettes en cuir terracotta et tombée de lumière ambrée, découvrez une cuisine française d'auteur contemporaine et vivante.
              </p>
            </div>

            {/* Quick Reservation Engine Strip */}
            <form
              onSubmit={handleMiniSubmit}
              className="p-4 sm:p-5 bg-stone-900/90 rounded-2xl border border-stone-800 shadow-xl space-y-3 max-w-xl backdrop-blur-md"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Vérifier les tables disponibles ce soir</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Guests */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-400 flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#D97236]" />
                    <span>Couverts</span>
                  </label>
                  <select
                    value={quickGuests}
                    onChange={(e) => setQuickGuests(Number(e.target.value))}
                    className="w-full text-xs font-medium py-2.5 px-3 bg-stone-800 border border-stone-700 rounded-xl text-white focus:outline-none focus:border-[#C25E2E] cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n} personne{n > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#D97236]" />
                    <span>Date</span>
                  </label>
                  <input
                    type="date"
                    value={quickDate}
                    onChange={(e) => setQuickDate(e.target.value)}
                    className="w-full text-xs font-medium py-2 px-3 bg-stone-800 border border-stone-700 rounded-xl text-white focus:outline-none focus:border-[#C25E2E] cursor-pointer"
                  />
                </div>

                {/* Service */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D97236]" />
                    <span>Service</span>
                  </label>
                  <select
                    value={quickService}
                    onChange={(e) => setQuickService(e.target.value as 'dejeuner' | 'diner')}
                    className="w-full text-xs font-medium py-2.5 px-3 bg-stone-800 border border-stone-700 rounded-xl text-white focus:outline-none focus:border-[#C25E2E] cursor-pointer"
                  >
                    <option value="diner">Dîner (19h30 - 22h)</option>
                    <option value="dejeuner">Déjeuner (12h - 14h)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-stone-400">
                  Réservation instantanée confirmée en ligne
                </span>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#C25E2E] hover:bg-[#D97236] rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Trouver ma Table</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Quick Explore Buttons */}
            <div className="flex items-center gap-4 text-xs font-semibold text-stone-400">
              <button
                onClick={onExploreMenu}
                className="hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
              >
                Découvrir la Carte Gastronomique &rarr;
              </button>
              <button
                onClick={onExploreSpaces}
                className="hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
              >
                Visiter les Espaces &rarr;
              </button>
            </div>
          </div>

          {/* Right Column: Hero Interior Image (matching uploaded restaurant photo) */}
          <div className="lg:col-span-5 flex">
            <div className="relative w-full rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-950 flex flex-col group">
              <img
                src="/src/assets/images/interior_dining_room_1791995929595.jpg"
                alt="Intérieur du restaurant Maison Sienne avec banquettes en cuir terracotta et suspensions ambrées"
                referrerPolicy="no-referrer"
                className="w-full h-80 lg:h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="text-[11px] uppercase tracking-widest text-amber-300 font-bold mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D97236]" />
                  La Grande Salle aux Banquettes Sienne
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2 leading-tight">
                  L’Ambiance Signature
                </h3>
                <p className="text-xs text-stone-300 line-clamp-2 mb-3 leading-relaxed font-normal">
                  Chêne blond sculpté, cuir pleine fleur sur-mesure et éclairage d'ambiance 2200K pour une intimité absolue.
                </p>
                <div className="text-[11px] text-stone-400 border-t border-stone-700/80 pt-2 flex items-center justify-between">
                  <span>65 Couverts · Climatisation feutrée</span>
                  <span className="text-amber-300 font-medium">Banquettes & Alcôves</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Prestige & Trust Strip */}
        <div className="mt-12 pt-8 border-t border-stone-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-300">
          <div>
            <div className="font-serif text-lg font-bold text-[#F5F2EB]">Guide Michelin</div>
            <p className="text-xs text-stone-400 mt-0.5">Table remarquée pour sa créativité & sélection</p>
          </div>
          <div>
            <div className="font-serif text-lg font-bold text-[#F5F2EB]">Banquettes en Cuir</div>
            <p className="text-xs text-stone-400 mt-0.5">Assises sur-mesure et confort feutré d'exception</p>
          </div>
          <div>
            <div className="font-serif text-lg font-bold text-[#F5F2EB]">450 Références</div>
            <p className="text-xs text-stone-400 mt-0.5">Cave de vignerons indépendants & vieux millésimes</p>
          </div>
          <div>
            <div className="font-serif text-lg font-bold text-[#F5F2EB]">Service Voiturier</div>
            <p className="text-xs text-stone-400 mt-0.5">Accueil personnalisé dès votre arrivée</p>
          </div>
        </div>
      </div>
    </section>
  );
};
