import React, { useState } from 'react';
import { Recipe, Ingredient } from '../types';
import {
  X,
  Clock,
  Users,
  Flame,
  ChefHat,
  Wine,
  CheckCircle2,
  Circle,
  Timer,
  ShoppingBag,
  Printer,
  Heart,
  Share2,
  Check,
} from 'lucide-react';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onAddIngredientsToShoppingList: (ingredients: Ingredient[], recipeTitle: string, servings: number) => void;
  onStartTimer: (minutes: number, label: string) => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddIngredientsToShoppingList,
  onStartTimer,
}) => {
  if (!recipe) return null;

  const [servings, setServings] = useState<number>(recipe.baseServings);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedToList, setAddedToList] = useState(false);

  const ratio = servings / recipe.baseServings;

  const formatQuantity = (qty: number, unit: string) => {
    const adjusted = qty * ratio;
    if (unit === 'pièce' || unit === 'pièces' || unit === 'gousses' || unit === 'branches') {
      const rounded = Math.round(adjusted * 10) / 10;
      return rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(1);
    }
    if (adjusted >= 100) {
      return Math.round(adjusted).toString();
    }
    const rounded = Math.round(adjusted * 10) / 10;
    return rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(1);
  };

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNumber) ? prev.filter((s) => s !== stepNumber) : [...prev, stepNumber]
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddAllToCart = () => {
    onAddIngredientsToShoppingList(recipe.ingredients, recipe.title, servings);
    setAddedToList(true);
    setTimeout(() => setAddedToList(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header Bar with quick tools */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/80 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
            <ChefHat className="w-4 h-4" />
            <span>{recipe.category}</span>
            <span className="text-stone-300">·</span>
            <span className="text-stone-500 font-normal">{recipe.difficulty}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(recipe.id)}
              className="p-2 rounded-lg text-stone-600 hover:text-rose-600 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Ajouter aux favoris"
            >
              <Heart
                className={`w-4 h-4 ${isFavorite ? 'fill-rose-600 text-rose-600' : ''}`}
              />
            </button>
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Copier le lien"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => window.print()}
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Imprimer la fiche recette"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer ml-2"
              title="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Hero Banner inside Modal */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight">
                {recipe.title}
              </h2>
              <p className="text-sm sm:text-base text-stone-600 italic font-serif">
                {recipe.subtitle}
              </p>
              <p className="text-sm text-stone-700 leading-relaxed font-normal">
                {recipe.description}
              </p>

              {/* Timing & Nutrition Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-stone-600 border-t border-stone-100">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span>Prépa: {recipe.prepTime} min</span>
                  <span className="text-stone-300">·</span>
                  <span>Cuisson: {recipe.cookTime} min</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-700" />
                  <span className="tabular-nums">{recipe.nutrition.calories} kcal / portion</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 h-56 sm:h-64 rounded-xl overflow-hidden shadow-sm border border-stone-200">
              <img
                src={recipe.image}
                alt={recipe.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Interactive Portions & Ingredients Module */}
          <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200/80 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Ingrédients du Terroir
                </h3>
                <p className="text-xs text-stone-500">
                  Ajustez le nombre de convives pour recalculer les pesées
                </p>
              </div>

              {/* Dynamic Portions Stepper */}
              <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-xs">
                <Users className="w-4 h-4 text-stone-500" />
                <span className="text-xs font-medium text-stone-600">Portions :</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setServings((s) => Math.max(1, s - 1))}
                    disabled={servings <= 1}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 disabled:opacity-40 transition-colors text-sm font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-mono text-sm font-bold text-stone-900 min-w-5 text-center tabular-nums">
                    {servings}
                  </span>
                  <button
                    onClick={() => setServings((s) => Math.min(20, s + 1))}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors text-sm font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Scaled Ingredients Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recipe.ingredients.map((ing) => (
                <div
                  key={ing.id}
                  className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-stone-200/70 text-xs sm:text-sm text-stone-800"
                >
                  <span className="font-normal text-stone-700">{ing.name}</span>
                  <span className="font-semibold text-stone-900 ml-2 whitespace-nowrap tabular-nums">
                    {formatQuantity(ing.quantity, ing.unit)} {ing.unit}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Add To Shopping List CTA */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleAddAllToCart}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                {addedToList ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Ingrédients ajoutés à la liste !</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Ajouter à ma liste de courses ({servings} pers.)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Step-by-Step Cooking Guide */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Préparation Pas-à-Pas
                </h3>
                <p className="text-xs text-stone-500">
                  Cochez les étapes validées au fur et à mesure de votre préparation
                </p>
              </div>

              {completedSteps.length > 0 && (
                <span className="text-xs text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-md">
                  {completedSteps.length} / {recipe.instructions.length} étapes terminées
                </span>
              )}
            </div>

            <div className="space-y-4">
              {recipe.instructions.map((step) => {
                const isDone = completedSteps.includes(step.stepNumber);
                return (
                  <div
                    key={step.stepNumber}
                    onClick={() => toggleStep(step.stepNumber)}
                    className={`p-5 rounded-xl border transition-all cursor-pointer ${
                      isDone
                        ? 'bg-stone-50 border-stone-200/60 opacity-70'
                        : 'bg-white border-stone-200 hover:border-amber-700/50 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="pt-0.5">
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-stone-300" />
                        )}
                      </div>

                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <h4
                            className={`text-sm font-bold font-serif ${
                              isDone ? 'line-through text-stone-500' : 'text-stone-900'
                            }`}
                          >
                            Étape {step.stepNumber}. {step.title}
                          </h4>

                          {step.durationMinutes && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onStartTimer(
                                  step.durationMinutes!,
                                  `Étape ${step.stepNumber} : ${step.title}`
                                );
                              }}
                              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-md border border-amber-200/80 transition-colors cursor-pointer"
                              title="Lancer le minuteur pour cette étape"
                            >
                              <Timer className="w-3.5 h-3.5" />
                              <span>{step.durationMinutes} min · Minuter</span>
                            </button>
                          )}
                        </div>

                        <p
                          className={`text-xs sm:text-sm leading-relaxed ${
                            isDone ? 'text-stone-500 line-through' : 'text-stone-700 font-normal'
                          }`}
                        >
                          {step.description}
                        </p>

                        {step.tip && !isDone && (
                          <div className="mt-2 p-2.5 bg-amber-50/70 border border-amber-200/60 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                            <span className="font-semibold shrink-0">Astuce :</span>
                            <span>{step.tip}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Accord Mets & Vins + Conseil du Chef */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {recipe.chefTip && (
              <div className="p-5 bg-stone-100/80 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-900">
                  <ChefHat className="w-4 h-4 text-amber-700" />
                  <span>Le Conseil du Chef</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                  {recipe.chefTip}
                </p>
              </div>
            )}

            {recipe.winePairing && (
              <div className="p-5 bg-stone-100/80 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-900">
                  <Wine className="w-4 h-4 text-rose-700" />
                  <span>Accord Mets & Vins</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                  {recipe.winePairing}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
