import React from 'react';
import { ReservationData } from '../types/restaurant';
import { DINING_AREAS } from '../data/restaurantData';
import { X, Calendar, Clock, Users, MapPin, Trash2, CheckCircle2 } from 'lucide-react';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: ReservationData[];
  onCancelReservation: (id: string) => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  reservations,
  onCancelReservation,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#1A1816] rounded-2xl shadow-2xl border border-stone-800 overflow-hidden flex flex-col max-h-[90vh] text-stone-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-[#161413] sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h3 className="font-serif text-lg font-bold text-white">
              Mes Réservations à Maison Sienne
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-4">
          {reservations.length === 0 ? (
            <div className="py-12 text-center text-stone-400 space-y-2">
              <Calendar className="w-10 h-10 text-stone-600 mx-auto" />
              <p className="font-serif text-lg text-white">Aucune réservation active</p>
              <p className="text-xs text-stone-400">
                Vous n'avez pas encore réservé de table à Maison Sienne.
              </p>
            </div>
          ) : (
            reservations.map((res) => {
              const areaObj = DINING_AREAS.find((a) => a.id === res.area);
              return (
                <div
                  key={res.id}
                  className="p-5 bg-stone-900 rounded-2xl border border-stone-800 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                    <span className="font-mono text-xs font-bold text-amber-300">
                      Réf: {res.id}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      Confirmée
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 text-stone-300">
                      <Calendar className="w-4 h-4 text-[#D97236]" />
                      <span>{res.date}</span>
                    </div>

                    <div className="flex items-center gap-2 text-stone-300">
                      <Clock className="w-4 h-4 text-[#D97236]" />
                      <span>{res.time} ({res.service === 'dejeuner' ? 'Midi' : 'Soir'})</span>
                    </div>

                    <div className="flex items-center gap-2 text-stone-300">
                      <Users className="w-4 h-4 text-[#D97236]" />
                      <span>{res.guests} couvert{res.guests > 1 ? 's' : ''}</span>
                    </div>

                    <div className="flex items-center gap-2 text-amber-200">
                      <MapPin className="w-4 h-4 text-[#D97236]" />
                      <span className="truncate">{areaObj?.name || 'Grande Salle'}</span>
                    </div>
                  </div>

                  {res.customerName && (
                    <div className="text-xs text-stone-400 pt-1">
                      Réservé au nom de : <span className="text-white font-medium">{res.customerName}</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-stone-800 flex items-center justify-end">
                    <button
                      onClick={() => onCancelReservation(res.id)}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Annuler ma réservation</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
