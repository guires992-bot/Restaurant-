import React from 'react';
import { Search, Sparkles, ChefHat, Clock, Users, ArrowRight } from 'lucide-react';
import { Category } from '../types';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
  onExploreRecipe: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onExploreRecipe,
}) => {
  const categories: Category[] = [
    'Toutes',
    'Plats mijotés',
    'Pâtisserie & Desserts',
    'Végétarien',
    'Entrées',
    'Rapide & Facile',
  ];

  return (
    <section className="relative overflow-hidden border-b border-stone-200 bg-[#F5F4EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-800">
                <ChefHat className="w-4 h-4" />
                <span>Gastronomie & Savoir-Faire Français</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="text-stone-500 font-normal">Édition Saisonnière</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-[1.15]">
                L’art de la cuisine vraie, <br className="hidden sm:inline" />
                du marché à votre table.
              </h1>

              <p className="text-base sm:text-lg text-stone-600 font-normal max-w-xl leading-relaxed">
                Explorez des recettes de tradition et d'auteur pas-à-pas, ajustez les proportions selon vos convives, et sublimez les produits de saison avec précision.
              </p>
            </div>

            {/* Live Search Bar */}
            <div className="relative max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une recette, un ingrédient (bœuf, pommes, chanterelles...)"
                className="w-full pl-11 pr-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 text-sm shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  Effacer
                </button>
              )}
            </div>

            {/* Category Segmented Controls */}
            <div className="space-y-2">
              <div className="text-xs font-medium uppercase tracking-wider text-stone-500">
                Collections du chef
              </div>
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/60 rounded-xl w-fit max-w-full">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-white text-stone-900 shadow-xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Featured Recipe Showcase Card */}
          <div className="lg:col-span-5 flex">
            <div className="relative w-full rounded-2xl overflow-hidden border border-stone-300/80 shadow-md bg-stone-900 flex flex-col group">
              <img
                src="/src/assets/images/recipe_boeuf_bourguignon_1791993491292.jpg"
                alt="Bœuf Bourguignon Traditionnel dans sa cocotte en fonte"
                referrerPolicy="no-referrer"
                className="w-full h-72 sm:h-80 lg:h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  À la Une cette Semaine
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2 leading-tight">
                  Bœuf Bourguignon Traditionnel
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 line-clamp-2 mb-4 leading-relaxed font-normal">
                  Paleron confit pendant 3h au vin rouge de Bourgogne, carottes fondantes et petits oignons glacés à brun.
                </p>

                <div className="flex items-center justify-between text-xs text-stone-300 border-t border-stone-700/80 pt-3">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      3h35
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      4 personnes
                    </span>
                  </div>
                  <button
                    onClick={() => onExploreRecipe('boeuf-bourguignon')}
                    className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-white transition-colors cursor-pointer group-hover:translate-x-1 duration-200"
                  >
                    <span>Cuisiner</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Culinary KPI Strip */}
        <div className="mt-12 pt-8 border-t border-stone-300/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-700">
          <div>
            <div className="font-serif text-lg font-bold text-stone-900">100% Terroir</div>
            <p className="text-xs text-stone-500 mt-0.5">Recettes testées et approuvées en brigade</p>
          </div>
          <div>
            <div className="font-serif text-lg font-bold text-stone-900">Portions Dynamiques</div>
            <p className="text-xs text-stone-500 mt-0.5">Recalcul instantané pour 2 à 12 convives</p>
          </div>
          <div>
            <div className="font-serif text-lg font-bold text-stone-900">Minuteur Audio Intégré</div>
            <p className="text-xs text-stone-500 mt-0.5">Alertes de cuisson sonores sans quitter l'écran</p>
          </div>
          <div>
            <div className="font-serif text-lg font-bold text-stone-900">Zéro Gaspillage</div>
            <p className="text-xs text-stone-500 mt-0.5">Module intelligent selon le contenu de votre frigo</p>
          </div>
        </div>
      </div>
    </section>
  );
};
