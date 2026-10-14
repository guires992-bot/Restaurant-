import React, { useState } from 'react';
import { Recipe } from '../types';
import { Sparkles, Plus, X, Refrigerator, Check, AlertCircle, ArrowRight } from 'lucide-react';

interface FridgeFinderProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
}

const COMMON_PANTRY_ITEMS = [
  'Tomates',
  'Pommes',
  'Champignons',
  'Courgettes',
  'Carottes',
  'Ail',
  'Oignons',
  'Bœuf',
  'Poulet',
  'Lardons',
  'Burrata',
  'Beurre',
  'Parmesan',
  'Farine',
  'Crème fraîche',
  'Vin rouge',
  'Riz',
  'Pâte feuilletée',
  'Aubergines',
  'Thym',
];

export const FridgeFinder: React.FC<FridgeFinderProps> = ({ recipes, onSelectRecipe }) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
    'Tomates',
    'Beurre',
    'Ail',
  ]);
  const [customInput, setCustomInput] = useState('');
  const [expressIdea, setExpressIdea] = useState<string | null>(null);

  const toggleIngredient = (name: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const addCustomIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customInput.trim();
    if (trimmed && !selectedIngredients.some((i) => i.toLowerCase() === trimmed.toLowerCase())) {
      setSelectedIngredients((prev) => [...prev, trimmed]);
      setCustomInput('');
    }
  };

  const removeIngredient = (name: string) => {
    setSelectedIngredients((prev) => prev.filter((i) => i !== name));
  };

  const scoredRecipes = recipes
    .map((recipe) => {
      const matchDetails = recipe.ingredients.map((ing) => {
        const matches = selectedIngredients.some(
          (sel) =>
            ing.name.toLowerCase().includes(sel.toLowerCase()) ||
            sel.toLowerCase().includes(ing.name.toLowerCase())
        );
        return { name: ing.name, matches };
      });

      const matchedCount = matchDetails.filter((m) => m.matches).length;
      const totalCount = recipe.ingredients.length;
      const score = Math.round((matchedCount / totalCount) * 100);
      const missing = matchDetails.filter((m) => !m.matches).map((m) => m.name);

      return {
        recipe,
        score,
        matchedCount,
        totalCount,
        missing,
      };
    })
    .sort((a, b) => b.score - a.score);

  const generateExpressChefIdea = () => {
    if (selectedIngredients.length === 0) return;
    const listStr = selectedIngredients.join(', ');
    setExpressIdea(
      `Suggestion du Chef : "Poêlée gourmande minute aux ${listStr}". Saisissez vos ingrédients à la poêle avec un filet d'huile ou une noix de beurre, déglacez avec un fond de bouillon ou une larme de vinaigre, et parsemez d'herbes fraîches avec une pincée de fleur de sel !`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Intro Header */}
      <div className="max-w-2xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
          <Refrigerator className="w-4 h-4" />
          <span>Anti-Gaspillage & Créativité Culinaire</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-stone-900 tracking-tight">
          Dans mon Réfrigérateur & Garde-Manger
        </h2>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
          Sélectionnez ce que vous avez sous la main. Notre atelier compare instantanément vos ingrédients aux fiches recettes et vous propose les meilleures associations.
        </p>
      </div>

      {/* Ingredient Selection Board */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-3">
            1. Ingrédients fréquents (cliquez pour ajouter / retirer)
          </label>
          <div className="flex flex-wrap gap-2">
            {COMMON_PANTRY_ITEMS.map((item) => {
              const isSelected = selectedIngredients.includes(item);
              return (
                <button
                  key={item}
                  onClick={() => toggleIngredient(item)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                  <span>{item}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Input */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2">
            2. Ajouter un autre ingrédient de votre cuisine
          </label>
          <form onSubmit={addCustomIngredient} className="flex gap-2 max-w-md">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Ex: Échalote, Mozzarella, Estragon..."
              className="flex-1 px-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter</span>
            </button>
          </form>
        </div>

        {/* Selected Basket */}
        <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-stone-500">Votre panier actuel :</span>
            {selectedIngredients.length === 0 ? (
              <span className="text-xs text-stone-400 italic">Aucun ingrédient sélectionné</span>
            ) : (
              selectedIngredients.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-900 rounded-md text-xs font-medium border border-amber-200/60"
                >
                  {item}
                  <button
                    onClick={() => removeIngredient(item)}
                    className="text-amber-700 hover:text-amber-950 p-0.5"
                    aria-label={`Supprimer ${item}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))
            )}
          </div>

          <button
            onClick={generateExpressChefIdea}
            disabled={selectedIngredients.length === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-100/80 hover:bg-amber-200 rounded-lg transition-colors disabled:opacity-50 cursor-pointer self-start sm:self-auto shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Astuce express du chef</span>
          </button>
        </div>

        {expressIdea && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed relative">
            <button
              onClick={() => setExpressIdea(null)}
              className="absolute top-2 right-2 text-amber-700 hover:text-amber-950 p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <p className="font-serif text-sm font-semibold mb-1">Idée minute :</p>
            <p>{expressIdea}</p>
          </div>
        )}
      </div>

      {/* Matching Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-stone-900">
            Recettes correspondantes ({scoredRecipes.filter((r) => r.matchedCount > 0).length})
          </h3>
          <span className="text-xs text-stone-500">
            Classées par taux de correspondance d'ingrédients
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scoredRecipes.map(({ recipe, score, matchedCount, totalCount, missing }) => (
            <div
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe)}
              className="bg-white rounded-2xl border border-stone-200 hover:border-stone-300 hover:shadow-md transition-all p-5 flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-xs text-stone-500 font-medium">
                      {recipe.category} · {recipe.difficulty}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                      {recipe.title}
                    </h4>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`text-sm font-mono font-bold tabular-nums px-2 py-0.5 rounded-md ${
                        score >= 60
                          ? 'bg-emerald-100 text-emerald-800'
                          : score >= 30
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {score}%
                    </span>
                  </div>
                </div>

                <div className="h-36 rounded-xl overflow-hidden bg-stone-100 relative">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>

                {/* Match indicator */}
                <div className="text-xs text-stone-600 space-y-1">
                  <div className="flex items-center gap-1 font-semibold text-stone-800">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      {matchedCount} sur {totalCount} ingrédients disponibles
                    </span>
                  </div>

                  {missing.length > 0 && missing.length <= 4 && (
                    <div className="flex items-start gap-1 text-stone-500 text-[11px] pt-1">
                      <AlertCircle className="w-3 h-3 text-stone-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">
                        Il vous manque : {missing.slice(0, 3).join(', ')}
                        {missing.length > 3 ? '...' : ''}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-amber-800">
                <span>Cuisiner avec ce que j'ai</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
