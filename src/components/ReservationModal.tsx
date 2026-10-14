import React, { useState } from 'react';
import { DiningAreaId, ReservationData } from '../types/restaurant';
import { DINING_AREAS } from '../data/restaurantData';
import {
  X,
  Calendar,
  Users,
  Clock,
  CheckCircle2,
  Phone,
  Mail,
  User,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReservation: (data: ReservationData) => void;
  prefillGuests?: number;
  prefillDate?: string;
  prefillService?: 'dejeuner' | 'diner';
  prefillArea?: DiningAreaId;
}

const SERVICE_HOURS = {
  dejeuner: ['12h00', '12h30', '13h00', '13h30'],
  diner: ['19h30', '20h00', '20h30', '21h00', '21h30'],
};

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  onConfirmReservation,
  prefillGuests = 2,
  prefillDate,
  prefillService = 'diner',
  prefillArea = 'banquette-sienne',
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [guests, setGuests] = useState<number>(prefillGuests);
  const [date, setDate] = useState<string>(
    prefillDate || new Date().toISOString().split('T')[0]
  );
  const [service, setService] = useState<'dejeuner' | 'diner'>(prefillService);
  const [time, setTime] = useState<string>('20h00');
  const [area, setArea] = useState<DiningAreaId>(prefillArea);

  // Guest details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [specialOccasion, setSpecialOccasion] = useState('');

  // Confirmed state
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) return;

    const reservation: ReservationData = {
      id: `MS-${Math.floor(1000 + Math.random() * 9000)}`,
      date,
      service,
      time,
      guests,
      area,
      customerName: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      dietaryNotes: dietaryNotes.trim() || undefined,
      specialOccasion: specialOccasion.trim() || undefined,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    onConfirmReservation(reservation);
    setConfirmedReservation(reservation);
    setStep(3);
  };

  const selectedAreaObj = DINING_AREAS.find((a) => a.id === area) || DINING_AREAS[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#1A1816] rounded-2xl shadow-2xl border border-stone-800 overflow-hidden flex flex-col max-h-[92vh] text-stone-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-[#161413] sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C25E2E]" />
            <span className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#F5F2EB]">
              Maison Sienne · Réservation de Table
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* STEP 1: Table & Timing Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-white">
                  Composez votre expérience
                </h3>
                <p className="text-xs text-stone-400">
                  Choisissez vos couverts, la date et votre espace favori dans la salle.
                </p>
              </div>

              {/* Number of Guests */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#C25E2E]" />
                  <span>Nombre de convives</span>
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setGuests(n)}
                      className={`py-2 text-xs font-mono font-bold rounded-xl border transition-all cursor-pointer ${
                        guests === n
                          ? 'bg-[#C25E2E] text-white border-[#C25E2E] shadow-md'
                          : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800'
                      }`}
                    >
                      {n} {n === 8 ? '+' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C25E2E]" />
                    <span>Date du repas</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#C25E2E]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C25E2E]" />
                    <span>Service</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setService('dejeuner');
                        setTime('12h30');
                      }}
                      className={`py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        service === 'dejeuner'
                          ? 'bg-[#C25E2E] text-white border-[#C25E2E]'
                          : 'bg-stone-900 text-stone-400 border-stone-800'
                      }`}
                    >
                      Déjeuner (12h - 14h)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setService('diner');
                        setTime('20h00');
                      }}
                      className={`py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        service === 'diner'
                          ? 'bg-[#C25E2E] text-white border-[#C25E2E]'
                          : 'bg-stone-900 text-stone-400 border-stone-800'
                      }`}
                    >
                      Dîner (19h30 - 22h)
                    </button>
                  </div>
                </div>
              </div>

              {/* Exact Time Slot */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Heure d'arrivée souhaitée
                </label>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_HOURS[service].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
                        time === slot
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                          : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-white'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area Selection (Inspired by the photo) */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center justify-between">
                  <span>Préférence d'ambiance en salle</span>
                  <span className="text-[11px] text-amber-400 normal-case font-normal">
                    Selon disponibilités du service
                  </span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DINING_AREAS.map((a) => (
                    <div
                      key={a.id}
                      onClick={() => setArea(a.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        area === a.id
                          ? 'bg-stone-900 border-[#C25E2E] shadow-sm text-white'
                          : 'bg-stone-950/60 border-stone-800/80 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm font-bold text-white">
                          {a.name}
                        </span>
                        {area === a.id && (
                          <span className="w-2 h-2 rounded-full bg-[#C25E2E]" />
                        )}
                      </div>
                      <p className="text-[11px] text-stone-400 mt-1 line-clamp-2">
                        {a.subtitle}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next CTA */}
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#C25E2E] hover:bg-[#D97236] rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Continuer & renseigner mes coordonnées</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Guest Details */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-white">
                  Coordonnées & Préférences
                </h3>
                <p className="text-xs text-stone-400">
                  Pour votre réservation de {guests} couvert{guests > 1 ? 's' : ''} le {date} à {time} ({selectedAreaObj.name}).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-stone-400 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#C25E2E]" />
                    <span>Nom & Prénom *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Hélène de Montmirail"
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#C25E2E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-400 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#C25E2E]" />
                    <span>Adresse Email *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@exemple.fr"
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#C25E2E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-400 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#C25E2E]" />
                    <span>Numéro de Téléphone *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="06 12 34 56 78"
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#C25E2E]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-stone-400">
                    Allergies ou régimes alimentaires
                  </label>
                  <input
                    type="text"
                    value={dietaryNotes}
                    onChange={(e) => setDietaryNotes(e.target.value)}
                    placeholder="Ex: Sans gluten, végétarien, intolérance fruits à coque..."
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#C25E2E]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-stone-400">
                    Occasion spéciale (optionnel)
                  </label>
                  <input
                    type="text"
                    value={specialOccasion}
                    onChange={(e) => setSpecialOccasion(e.target.value)}
                    placeholder="Ex: Anniversaire de mariage, dîner professionnel, demande..."
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#C25E2E]"
                  />
                </div>
              </div>

              <div className="p-3.5 bg-stone-900/60 rounded-xl border border-stone-800 flex items-center gap-2 text-[11px] text-stone-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Confirmation immédiate garantie · Annulation sans frais jusqu'à 6h avant le service.</span>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-stone-400 hover:text-white cursor-pointer"
                >
                  &larr; Modifier la date ou l'espace
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#C25E2E] hover:bg-[#D97236] rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Confirmer la réservation</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Confirmation Screen */}
          {step === 3 && confirmedReservation && (
            <div className="py-6 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#D97236] font-semibold">
                  Réservation Confirmée
                </span>
                <h3 className="font-serif text-3xl font-bold text-white">
                  Nous avons hâte de vous recevoir
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto">
                  Un email de confirmation a été transmis à <span className="text-white font-semibold">{confirmedReservation.email}</span>.
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-6 bg-stone-900 rounded-2xl border border-stone-800 max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <span className="text-xs text-stone-400">Référence</span>
                  <span className="font-mono text-sm font-bold text-amber-300">
                    {confirmedReservation.id}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-400">Convives</span>
                  <span className="font-semibold text-white">
                    {confirmedReservation.guests} personne{confirmedReservation.guests > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-400">Date & Heure</span>
                  <span className="font-semibold text-white">
                    {confirmedReservation.date} à {confirmedReservation.time}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-400">Espace attribué</span>
                  <span className="font-semibold text-amber-200">
                    {selectedAreaObj.name}
                  </span>
                </div>

                {confirmedReservation.specialOccasion && (
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-800">
                    <span className="text-stone-400">Occasion</span>
                    <span className="text-stone-300 italic">
                      {confirmedReservation.specialOccasion}
                    </span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-stone-800 hover:bg-stone-700 rounded-xl transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
