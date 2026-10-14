import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuCategory, DietaryTag, MenuItem } from '../types/restaurant';
import { Wine, Sparkles, Utensils, Leaf, Check } from 'lucide-react';

interface RestaurantMenuProps {
  onOpenReservation: () => void;
}

const CATEGORY_TABS: { id: MenuCategory; label: string }[] = [
  { id: 'degustation', label: 'Menus Dégustation' },
  { id: 'entrees', label: 'Entrées' },
  { id: 'plats', label: 'Plats de Résistance' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'cocktails-vins', label: 'Cocktails & Vins' },
];

export const RestaurantMenu: React.FC<RestaurantMenuProps> = ({ onOpenReservation }) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('degustation');
  const [dietaryFilter, setDietaryFilter] = useState<DietaryTag | 'all'>('all');
  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);

  const toggleSelectDish = (id: string) => {
    setSelectedDishes((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredItems = MENU_ITEMS.filter((item) => {
    if (item.category !== activeCategory) return false;
    if (dietaryFilter !== 'all' && !item.dietary?.includes(dietaryFilter)) return false;
    return true;
  });

  return (
    <section id="carte" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-800">
        <div className="max-w-xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D97236]">
            <Utensils className="w-4 h-4" />
            <span>La Carte d'Auteur</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F5F2EB] tracking-tight">
            Créations Culinaires & Flacons Rares
          </h2>
          <p className="text-sm text-stone-300 font-normal leading-relaxed">
            Une cuisine guidée par les saisons, les cueillettes maraîchères et le respect absolu du produit brut.
          </p>
        </div>

        {/* Dietary Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-stone-400 font-medium mr-1">Régime :</span>
          <button
            onClick={() => setDietaryFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              dietaryFilter === 'all'
                ? 'bg-[#C25E2E] text-white font-bold'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
            }`}
          >
            Tous
          </button>
          <button
            onClick={() => setDietaryFilter('vegetarien')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
              dietaryFilter === 'vegetarien'
                ? 'bg-[#C25E2E] text-white font-bold'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
            }`}
          >
            <Leaf className="w-3 h-3 text-emerald-400" />
            <span>Végétarien</span>
          </button>
          <button
            onClick={() => setDietaryFilter('signature')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
              dietaryFilter === 'signature'
                ? 'bg-[#C25E2E] text-white font-bold'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Signatures</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-800/60 no-scrollbar">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === tab.id
                ? 'bg-stone-800 text-white border border-[#C25E2E]/60 shadow-xs'
                : 'text-stone-400 hover:text-white hover:bg-stone-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Menu Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredItems.map((item: MenuItem) => {
          const isSelected = selectedDishes.includes(item.id);

          return (
            <div
              key={item.id}
              className={`bg-stone-900/80 rounded-2xl border transition-all p-6 flex flex-col justify-between space-y-6 group ${
                item.highlight
                  ? 'border-[#C25E2E]/50 shadow-lg shadow-black/40'
                  : 'border-stone-800 hover:border-stone-700'
              }`}
            >
              {/* Dish Presentation */}
              <div className="space-y-4">
                {/* Photo for featured items */}
                {item.image && (
                  <div className="w-full h-52 sm:h-60 rounded-xl overflow-hidden relative bg-stone-950 border border-stone-800">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-xs text-amber-300 font-mono text-xs font-bold px-2.5 py-1 rounded-md border border-amber-500/30">
                      {item.price} €
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-xl font-bold text-[#F5F2EB] group-hover:text-amber-200 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    {!item.image && (
                      <span className="font-mono text-base font-bold text-amber-300 tabular-nums shrink-0">
                        {item.price} €
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-300 italic font-serif">
                    {item.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Terroir origin & Wine Pairing */}
                <div className="space-y-2 pt-2 border-t border-stone-800/80 text-xs text-stone-400">
                  {item.ingredientsOrigin && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-stone-500 font-semibold uppercase text-[10px]">Origine :</span>
                      <span>{item.ingredientsOrigin}</span>
                    </div>
                  )}

                  {item.winePairing && (
                    <div className="flex items-start gap-1.5 text-amber-200/90 bg-stone-950/60 p-2.5 rounded-lg border border-amber-900/30">
                      <Wine className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white mr-1">Accord Sommelier :</span>
                        <span>{item.winePairing}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Bottom CTA */}
              <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggleSelectDish(item.id)}
                  className={`text-xs font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                      <span>Ajouté à mes envies</span>
                    </>
                  ) : (
                    <span>+ Noter pour mon dîner</span>
                  )}
                </button>

                <button
                  onClick={onOpenReservation}
                  className="text-xs font-bold uppercase tracking-wider text-[#D97236] hover:text-white transition-colors cursor-pointer"
                >
                  Réserver pour déguster &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reservation Callout Banner */}
      <div className="p-8 bg-gradient-to-r from-stone-900 via-stone-900 to-[#2A180E] rounded-2xl border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
            Une table sur les banquettes en cuir sienne ce soir ?
          </h4>
          <p className="text-xs sm:text-sm text-stone-300 max-w-lg">
            Nous préparons chaque service avec un nombre de couverts limité afin de garantir une expérience gastronomique attentive et feutrée.
          </p>
        </div>
        <button
          onClick={onOpenReservation}
          className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#C25E2E] hover:bg-[#D97236] rounded-xl shadow-lg transition-all cursor-pointer whitespace-nowrap"
        >
          Choisir ma table & service
        </button>
      </div>
    </section>
  );
};
