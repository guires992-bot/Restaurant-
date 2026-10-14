import React from 'react';
import { MapPin, Phone, Mail, Clock, Car, Sparkles } from 'lucide-react';

interface RestaurantFooterProps {
  onOpenReservation: () => void;
  onOpenGiftModal: () => void;
  onNavigate: (section: string) => void;
}

export const RestaurantFooter: React.FC<RestaurantFooterProps> = ({
  onOpenReservation,
  onOpenGiftModal,
  onNavigate,
}) => {
  return (
    <footer className="border-t border-stone-800 bg-[#0E0D0C] text-stone-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4 md:col-span-1">
            <span className="font-serif text-2xl font-bold tracking-[0.15em] uppercase text-[#F5F2EB] block">
              Maison Sienne
            </span>
            <p className="text-xs text-stone-400 leading-relaxed font-normal">
              Une parenthèse gastronomique intime où dialoguent le cuir sienne patiné, le chêne blond et les suspensions d'ambre.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold pt-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Guide Michelin 2026</span>
            </div>
          </div>

          {/* Col 2: Horaires de Service */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C25E2E]" />
              <span>Horaires des Services</span>
            </h4>
            <div className="space-y-2 text-xs text-stone-300">
              <div>
                <span className="text-stone-400 block font-medium">Mardi — Samedi</span>
                <span>Déjeuner : 12h00 — 14h30</span>
                <span className="block">Dîner : 19h30 — 23h30</span>
              </div>
              <div className="pt-1 text-[11px] text-stone-500">
                <span>Le Bar & Lounge reste ouvert jusqu'à 01h00.</span>
                <span className="block text-stone-500">Fermeture hebdomadaire Dimanche & Lundi.</span>
              </div>
            </div>
          </div>

          {/* Col 3: Adresse & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C25E2E]" />
              <span>Accès & Coordonnées</span>
            </h4>
            <div className="space-y-2 text-xs text-stone-300">
              <p>
                18 Rue Beaujon<br />
                75008 Paris (Quartier Étoile)
              </p>
              <div className="space-y-1 pt-1">
                <a
                  href="tel:+33142685500"
                  className="flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors"
                >
                  <Phone className="w-3 h-3 text-[#D97236]" />
                  <span>01 42 68 55 00</span>
                </a>
                <a
                  href="mailto:contact@maisonsienne.fr"
                  className="flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors"
                >
                  <Mail className="w-3 h-3 text-[#D97236]" />
                  <span>contact@maisonsienne.fr</span>
                </a>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-stone-400 pt-1">
                <Car className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Service Voiturier chaque soir dès 19h30</span>
              </div>
            </div>
          </div>

          {/* Col 4: Liens Rapides & Réservations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Expériences
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button
                  onClick={onOpenReservation}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left font-semibold text-[#D97236]"
                >
                  &rarr; Réserver une table en ligne
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGiftModal}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Offrir un bon cadeau gastronomique
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('carte')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Consulter la carte des vins
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privatisation')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Privatiser le salon des boiseries
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Maison Sienne Paris. Tous droits réservés.</p>
          <p className="font-serif italic text-stone-400">
            « L’art de recevoir sous la lueur ambrée. »
          </p>
        </div>
      </div>
    </footer>
  );
};
