import React, { useState } from 'react';
import { DINING_AREAS } from '../data/restaurantData';
import { DiningAreaId } from '../types/restaurant';
import { Sparkles, Eye, Users, SunMedium, ArrowRight } from 'lucide-react';

interface AtmosphereShowcaseProps {
  onSelectAreaForBooking: (areaId: DiningAreaId) => void;
}

export const AtmosphereShowcase: React.FC<AtmosphereShowcaseProps> = ({
  onSelectAreaForBooking,
}) => {
  const [activeAreaId, setActiveAreaId] = useState<DiningAreaId>('banquette-sienne');

  const activeArea = DINING_AREAS.find((a) => a.id === activeAreaId) || DINING_AREAS[0];

  return (
    <section id="espaces" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="max-w-2xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D97236]">
          <Eye className="w-4 h-4 text-amber-400" />
          <span>Scénographie & Architecture Intérieure</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F5F2EB] tracking-tight">
          L’Écrin Maison Sienne
        </h2>
        <p className="text-sm sm:text-base text-stone-300 font-normal leading-relaxed">
          Pensé comme une ode aux teintes telluriques et à la douceur du soir, le restaurant associe le cuir pleine fleur terracotta, la rigueur poétique des claustras en chêne et le halo rassurant des suspensions ambrées.
        </p>
      </div>

      {/* Main Architectural Feature Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Interactive Area Selector */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
              Sélectionnez une zone du restaurant :
            </span>
            <div className="space-y-2">
              {DINING_AREAS.map((area) => (
                <button
                  key={area.id}
                  onClick={() => setActiveAreaId(area.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    activeAreaId === area.id
                      ? 'bg-stone-900 border-[#C25E2E] shadow-md text-white'
                      : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-white hover:bg-stone-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-base font-bold text-white">
                      {area.name}
                    </h3>
                    {activeAreaId === area.id && (
                      <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        Sélectionné
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-1">
                    {area.subtitle}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Active Area Details Box */}
          <div className="p-6 bg-stone-900 rounded-2xl border border-stone-800 space-y-4">
            <div className="space-y-2">
              <h4 className="font-serif text-xl font-bold text-white">
                {activeArea.name}
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                {activeArea.description}
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-stone-800 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-[#D97236] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Idéal pour : </span>
                  <span>{activeArea.idealFor}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <SunMedium className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Éclairage : </span>
                  <span>{activeArea.lightingVibe}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectAreaForBooking(activeArea.id)}
              className="w-full mt-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#C25E2E] hover:bg-[#D97236] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Réserver dans cet espace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Architectural Visual Focus */}
        <div className="lg:col-span-7 flex">
          <div className="relative w-full rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-950 flex flex-col">
            <img
              src={activeArea.image || '/src/assets/images/interior_dining_room_1791995929595.jpg'}
              alt={activeArea.name}
              referrerPolicy="no-referrer"
              className="w-full h-80 lg:h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
              <div className="inline-block px-3 py-1 bg-stone-900/80 backdrop-blur-md rounded-md text-[11px] font-mono uppercase tracking-widest text-amber-400 border border-amber-500/30 w-fit mb-2">
                Détail de Création
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
                {activeArea.subtitle}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl font-normal leading-relaxed">
                Le travail du cuir pleine fleur dans la teinte terre de Sienne répond à la découpe graphique des chênes et au souffle chaleureux des ampoules ambrées 2200 Kelvin.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Design Pillars Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="p-6 bg-stone-900/60 rounded-2xl border border-stone-800 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D97236]">01. Cuir Pleine Fleur Sienne</span>
          <p className="text-xs text-stone-300 leading-relaxed">
            Gainage artisanal des banquettes en cuir patiné couleur terre cuite d’Italie, assurant un maintien moelleux pour les longs dîners de dégustation.
          </p>
        </div>

        <div className="p-6 bg-stone-900/60 rounded-2xl border border-stone-800 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D97236]">02. Chêne Massif & Moucharabiehs</span>
          <p className="text-xs text-stone-300 leading-relaxed">
            Claustras géométriques ajourés qui sculptent l’espace sans l’isoler, offrant une intimité feutrée à chaque tablée.
          </p>
        </div>

        <div className="p-6 bg-stone-900/60 rounded-2xl border border-stone-800 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D97236]">03. Verre Soufflé & Lumière Dorée</span>
          <p className="text-xs text-stone-300 leading-relaxed">
            Suspensions en verre teinté ambre créant une bulle de clarté douce sur chaque table sans jamais éblouir les convives.
          </p>
        </div>
      </div>
    </section>
  );
};
