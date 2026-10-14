import React, { useState } from 'react';
import { Building2, Users, Wine, Check, Send, Sparkles } from 'lucide-react';

export const PrivateEventsSection: React.FC = () => {
  const [format, setFormat] = useState<'diner-assis' | 'cocktail'>('diner-assis');
  const [guestCount, setGuestCount] = useState<number>(12);
  const [includeWinePairing, setIncludeWinePairing] = useState<boolean>(true);
  const [sentInquiry, setSentInquiry] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  const basePricePerPerson = format === 'diner-assis' ? 120 : 85;
  const winePricePerPerson = includeWinePairing ? 45 : 0;
  const estimatedTotal = guestCount * (basePricePerPerson + winePricePerPerson);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail.trim()) return;
    setSentInquiry(true);
  };

  return (
    <section id="privatisation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="max-w-2xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D97236]">
          <Building2 className="w-4 h-4 text-amber-400" />
          <span>Événements Privés & Soirées d'Exception</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F5F2EB] tracking-tight">
          Privatisation & Dîners d’Affaires
        </h2>
        <p className="text-sm sm:text-base text-stone-300 font-normal leading-relaxed">
          Que ce soit pour un comité de direction confidentiel dans notre salon des boiseries ou une soirée de gala privatisant l'ensemble de notre salle aux banquettes sienne, notre équipe personnalise chaque détail.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Spaces options */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 bg-stone-900 rounded-2xl border border-stone-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-white">
                Le Salon Privatif des Boiseries
              </h3>
              <span className="text-xs font-mono text-amber-300 bg-stone-950 px-2 py-0.5 rounded-md border border-stone-700">
                8 à 14 convives
              </span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed font-normal">
              Entouré de claustras géométriques en chêne blond, cet espace isolé phoniquement offre une table de maître en chêne, un sommelier privé et un écran discret pour projections professionnelles.
            </p>
          </div>

          <div className="p-6 bg-stone-900 rounded-2xl border border-stone-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-white">
                Privatisation Totale de Maison Sienne
              </h3>
              <span className="text-xs font-mono text-amber-300 bg-stone-950 px-2 py-0.5 rounded-md border border-stone-700">
                Jusqu'à 65 assis / 90 debout
              </span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed font-normal">
              L'intégralité du restaurant pour vous : accès exclusif au bar en marbre noir, aux alcôves feutrées, aux banquettes en cuir sienne et menu signature exclusif créé par le chef.
            </p>
          </div>
        </div>

        {/* Right: Interactive Estimator & Request Form */}
        <div className="lg:col-span-6 bg-stone-900/90 p-6 sm:p-8 rounded-2xl border border-stone-800 shadow-xl space-y-6">
          <div className="space-y-1">
            <h4 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Simulateur d'événement sur-mesure</span>
            </h4>
            <p className="text-xs text-stone-400">
              Estimez votre format et recevez notre proposition détaillée sous 24h.
            </p>
          </div>

          <form onSubmit={handleInquirySubmit} className="space-y-5">
            {/* Format choice */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Format souhaité
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormat('diner-assis')}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                    format === 'diner-assis'
                      ? 'bg-[#C25E2E] text-white border-[#C25E2E]'
                      : 'bg-stone-950 text-stone-400 border-stone-800'
                  }`}
                >
                  Dîner Assis Gastronomique
                </button>
                <button
                  type="button"
                  onClick={() => setFormat('cocktail')}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                    format === 'cocktail'
                      ? 'bg-[#C25E2E] text-white border-[#C25E2E]'
                      : 'bg-stone-950 text-stone-400 border-stone-800'
                  }`}
                >
                  Cocktail Dînatoire & Bar
                </button>
              </div>
            </div>

            {/* Guests slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-300">
                <span className="font-semibold uppercase tracking-wider text-stone-400">
                  Nombre d'invités
                </span>
                <span className="font-mono font-bold text-amber-300 tabular-nums">
                  {guestCount} personnes
                </span>
              </div>
              <input
                type="range"
                min="6"
                max="65"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full accent-[#C25E2E] cursor-pointer"
              />
            </div>

            {/* Wine pairing toggle */}
            <div
              onClick={() => setIncludeWinePairing(!includeWinePairing)}
              className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-between cursor-pointer hover:border-stone-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Wine className="w-4 h-4 text-rose-400" />
                <span className="text-xs text-stone-200 font-medium">
                  Inclure la sélection de vins du sommelier (+45€/pers)
                </span>
              </div>
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                  includeWinePairing
                    ? 'bg-[#C25E2E] border-[#C25E2E] text-white'
                    : 'border-stone-700 bg-stone-900'
                }`}
              >
                {includeWinePairing && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>

            {/* Budget estimation box */}
            <div className="p-4 bg-stone-950/80 rounded-xl border border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-400 block">Budget indicatif estimé :</span>
                <span className="text-[11px] text-stone-500">Mets d'exception & service inclus</span>
              </div>
              <div className="text-right">
                <span className="font-serif text-2xl font-bold text-white tabular-nums">
                  ~ {estimatedTotal.toLocaleString('fr-FR')} €
                </span>
                <span className="text-[11px] text-stone-400 block">TTC</span>
              </div>
            </div>

            {/* Contact inputs */}
            {!sentInquiry ? (
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Entreprise ou Organisateur"
                    className="px-3.5 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#C25E2E]"
                  />
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Email de contact *"
                    className="px-3.5 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#C25E2E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#C25E2E] hover:bg-[#D97236] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Demander un devis personnalisé</span>
                </button>
              </div>
            ) : (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center space-y-1">
                <span className="text-xs font-bold text-emerald-400 block">
                  Demande transmise avec succès !
                </span>
                <p className="text-[11px] text-stone-300">
                  Notre responsable des réceptions privées vous contactera à {contactEmail} d'ici 24 heures ouvrées.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
