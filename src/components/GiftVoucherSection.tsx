import React, { useState } from 'react';
import { GIFT_VOUCHERS } from '../data/restaurantData';
import { GiftVoucher } from '../types/restaurant';
import { Gift, X, Check, Printer, Sparkles } from 'lucide-react';

interface GiftVoucherSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GiftVoucherSection: React.FC<GiftVoucherSectionProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [selectedVoucher, setSelectedVoucher] = useState<GiftVoucher>(GIFT_VOUCHERS[0]);
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim() || !sender.trim()) return;
    const code = `SIENNE-${Math.floor(1000 + Math.random() * 9000)}-${selectedVoucher.id.slice(0, 4).toUpperCase()}`;
    setGeneratedCode(code);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#1A1816] rounded-2xl shadow-2xl border border-stone-800 overflow-hidden flex flex-col max-h-[92vh] text-stone-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-[#161413] sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#F5F2EB]">
              Coffrets & Invitations Gastronomiques
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {!generatedCode ? (
            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-white">
                  Offrez l’art de vivre Maison Sienne
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Valable un an sur l'ensemble de notre restaurant gastronomique, midi et soir.
                </p>
              </div>

              {/* Vouchers Choice */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  1. Choisissez la formule cadeau
                </label>
                <div className="space-y-2">
                  {GIFT_VOUCHERS.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVoucher(v)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedVoucher.id === v.id
                          ? 'bg-stone-900 border-[#C25E2E] shadow-sm text-white'
                          : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-base font-bold text-white">
                          {v.title}
                        </span>
                        <span className="font-mono text-sm font-bold text-amber-300">
                          {v.price} €
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 mt-1">
                        {v.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personalization Inputs */}
              <div className="space-y-3 pt-2 border-t border-stone-800">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  2. Personnalisation de l'invitation
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-stone-400">
                      Pour (Bénéficiaire) *
                    </label>
                    <input
                      type="text"
                      required
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="Ex: Alexandre & Sophie"
                      className="w-full px-3.5 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#C25E2E]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-stone-400">
                      De la part de *
                    </label>
                    <input
                      type="text"
                      required
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                      placeholder="Ex: Vos amis de promotion"
                      className="w-full px-3.5 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#C25E2E]"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[11px] font-semibold text-stone-400">
                      Message d'accompagnement
                    </label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ex: Pour célébrer cette nouvelle année sous la lueur ambrée de Maison Sienne..."
                      className="w-full px-3.5 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#C25E2E]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#C25E2E] hover:bg-[#D97236] rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Générer l'invitation cadeau ({selectedVoucher.price} €)</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Elegant Printable Gift Card Certificate */}
              <div className="p-8 bg-gradient-to-br from-[#241E1A] to-[#161413] rounded-2xl border-2 border-[#C25E2E]/60 shadow-2xl text-center space-y-4">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#D97236] font-bold block">
                  Invitation Gastronomique · Maison Sienne
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F2EB]">
                  {selectedVoucher.title}
                </h3>

                <div className="text-xs text-stone-300 space-y-1 pt-2">
                  <p>
                    Offert à <span className="font-bold text-white">{recipient}</span>
                  </p>
                  <p>
                    Par <span className="font-bold text-white">{sender}</span>
                  </p>
                </div>

                {message && (
                  <p className="text-xs italic text-stone-400 max-w-sm mx-auto font-serif pt-1 border-t border-stone-800/80">
                    « {message} »
                  </p>
                )}

                <div className="pt-4 border-t border-stone-800/80 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-stone-500 uppercase tracking-widest">
                    Code d'activation unique
                  </span>
                  <span className="font-mono text-sm font-bold text-amber-300 tracking-wider">
                    {generatedCode}
                  </span>
                  <span className="text-[10px] text-stone-400 mt-1">
                    À mentionner lors de la réservation en ligne ou par téléphone
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setGeneratedCode(null)}
                  className="text-xs font-semibold text-stone-400 hover:text-white cursor-pointer"
                >
                  &larr; Créer un autre bon
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-4 py-2 text-xs font-semibold text-stone-200 bg-stone-800 hover:bg-stone-700 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimer / PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#C25E2E] hover:bg-[#D97236] rounded-xl transition-colors cursor-pointer"
                  >
                    Terminé
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
