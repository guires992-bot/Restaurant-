import React from 'react';
import { ShoppingBag, Timer, Plus, Bookmark } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  shoppingCount: number;
  onOpenShoppingList: () => void;
  onOpenTimer: () => void;
  onOpenAddRecipe: () => void;
  favoritesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  shoppingCount,
  onOpenShoppingList,
  onOpenTimer,
  onOpenAddRecipe,
  favoritesCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF7]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('recettes')}
          className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-amber-800 transition-colors cursor-pointer text-left"
        >
          L'Atelier Culinaire
        </button>

        {/* Zone 2: 4-5 Navigation Links (single line, no wrap) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('recettes')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'recettes'
                ? 'border-amber-700 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Toutes les Recettes
          </button>
          <button
            onClick={() => setActiveTab('frigo')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'frigo'
                ? 'border-amber-700 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Dans mon Frigo
          </button>
          <button
            onClick={() => setActiveTab('planning')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'planning'
                ? 'border-amber-700 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Menu de la Semaine
          </button>
          <button
            onClick={() => setActiveTab('techniques')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'techniques'
                ? 'border-amber-700 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Techniques & Astuces
          </button>
          <button
            onClick={() => setActiveTab('favoris')}
            className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'favoris'
                ? 'border-amber-700 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Mes Favoris {favoritesCount > 0 && `(${favoritesCount})`}</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenTimer}
            title="Ouvrir le minuteur culinaire"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <Timer className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">Minuteur</span>
          </button>

          <button
            onClick={onOpenAddRecipe}
            title="Ajouter une recette au carnet"
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ajouter une recette</span>
          </button>

          <button
            onClick={onOpenShoppingList}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors shadow-xs whitespace-nowrap cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Liste de courses</span>
            {shoppingCount > 0 && (
              <span className="bg-amber-500 text-stone-950 font-bold px-1.5 py-0.2 rounded-full text-[11px] tabular-nums">
                {shoppingCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-between overflow-x-auto px-4 py-2 border-t border-stone-200 text-xs font-medium text-stone-600 gap-4">
        <button
          onClick={() => setActiveTab('recettes')}
          className={`whitespace-nowrap shrink-0 py-1 ${activeTab === 'recettes' ? 'text-stone-900 font-bold border-b border-stone-900' : ''}`}
        >
          Recettes
        </button>
        <button
          onClick={() => setActiveTab('frigo')}
          className={`whitespace-nowrap shrink-0 py-1 ${activeTab === 'frigo' ? 'text-stone-900 font-bold border-b border-stone-900' : ''}`}
        >
          Dans mon Frigo
        </button>
        <button
          onClick={() => setActiveTab('planning')}
          className={`whitespace-nowrap shrink-0 py-1 ${activeTab === 'planning' ? 'text-stone-900 font-bold border-b border-stone-900' : ''}`}
        >
          Menu Semaine
        </button>
        <button
          onClick={() => setActiveTab('techniques')}
          className={`whitespace-nowrap shrink-0 py-1 ${activeTab === 'techniques' ? 'text-stone-900 font-bold border-b border-stone-900' : ''}`}
        >
          Techniques
        </button>
        <button
          onClick={() => setActiveTab('favoris')}
          className={`whitespace-nowrap shrink-0 py-1 ${activeTab === 'favoris' ? 'text-stone-900 font-bold border-b border-stone-900' : ''}`}
        >
          Favoris ({favoritesCount})
        </button>
      </div>
    </header>
  );
};
