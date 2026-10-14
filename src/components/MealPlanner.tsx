import React from 'react';
import { Recipe, DayPlan, Ingredient } from '../types';
import { Calendar, Wand2, ShoppingBag, Trash2, ArrowUpRight } from 'lucide-react';

interface MealPlannerProps {
  recipes: Recipe[];
  mealPlan: DayPlan[];
  setMealPlan: React.Dispatch<React.SetStateAction<DayPlan[]>>;
  onSelectRecipe: (recipe: Recipe) => void;
  onAddIngredientsToShoppingList: (ingredients: Ingredient[], recipeTitle: string, servings: number) => void;
  onOpenShoppingList: () => void;
}

export const MealPlanner: React.FC<MealPlannerProps> = ({
  recipes,
  mealPlan,
  setMealPlan,
  onSelectRecipe,
  onAddIngredientsToShoppingList,
  onOpenShoppingList,
}) => {
  const getRecipeById = (id?: string) => recipes.find((r) => r.id === id);

  const handleUpdateMeal = (day: string, type: 'lunch' | 'dinner', recipeId: string) => {
    setMealPlan((prev) =>
      prev.map((item) => {
        if (item.day === day) {
          return {
            ...item,
            [type === 'lunch' ? 'lunchRecipeId' : 'dinnerRecipeId']: recipeId || undefined,
          };
        }
        return item;
      })
    );
  };

  const handleAutoGeneratePlan = () => {
    if (recipes.length === 0) return;
    const shuffled = [...recipes].sort(() => 0.5 - Math.random());
    setMealPlan((prev) =>
      prev.map((dayItem, idx) => ({
        ...dayItem,
        lunchRecipeId: shuffled[idx % shuffled.length]?.id,
        dinnerRecipeId: shuffled[(idx + 2) % shuffled.length]?.id,
      }))
    );
  };

  const handleClearPlan = () => {
    setMealPlan((prev) =>
      prev.map((dayItem) => ({
        ...dayItem,
        lunchRecipeId: undefined,
        dinnerRecipeId: undefined,
      }))
    );
  };

  const handleExportWeekToShoppingList = () => {
    const plannedRecipeIds = new Set<string>();
    mealPlan.forEach((d) => {
      if (d.lunchRecipeId) plannedRecipeIds.add(d.lunchRecipeId);
      if (d.dinnerRecipeId) plannedRecipeIds.add(d.dinnerRecipeId);
    });

    if (plannedRecipeIds.size === 0) return;

    plannedRecipeIds.forEach((id) => {
      const rec = getRecipeById(id);
      if (rec) {
        onAddIngredientsToShoppingList(rec.ingredients, `Menu Hebdo : ${rec.title}`, rec.baseServings);
      }
    });

    onOpenShoppingList();
  };

  const totalPlannedMeals = mealPlan.reduce(
    (acc, cur) => acc + (cur.lunchRecipeId ? 1 : 0) + (cur.dinnerRecipeId ? 1 : 0),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header and Toolbar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-stone-200">
        <div className="max-w-xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
            <Calendar className="w-4 h-4" />
            <span>Organisation Culinaire</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-stone-900 tracking-tight">
            Menu Équilibré de la Semaine
          </h2>
          <p className="text-sm text-stone-600 font-normal">
            Planifiez vos déjeuners et dîners, variez les plaisirs gourmands et générez la liste de courses globale en 1 clic.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleAutoGeneratePlan}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-xl transition-colors cursor-pointer"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-800" />
            <span>Composer automatiquement</span>
          </button>

          {totalPlannedMeals > 0 && (
            <>
              <button
                onClick={handleClearPlan}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Effacer</span>
              </button>

              <button
                onClick={handleExportWeekToShoppingList}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Créer la liste de courses de la semaine</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        {mealPlan.map((dayPlan) => {
          const lunchRecipe = getRecipeById(dayPlan.lunchRecipeId);
          const dinnerRecipe = getRecipeById(dayPlan.dinnerRecipeId);

          return (
            <div
              key={dayPlan.day}
              className="bg-white rounded-2xl border border-stone-200 p-4 flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div className="pb-2 border-b border-stone-100">
                <span className="font-serif text-base font-bold text-stone-900">
                  {dayPlan.day}
                </span>
              </div>

              {/* Lunch Slot */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-900">
                  Midi
                </div>
                {lunchRecipe ? (
                  <div
                    onClick={() => onSelectRecipe(lunchRecipe)}
                    className="p-2.5 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200/80 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-800 line-clamp-1">
                      <span className="truncate">{lunchRecipe.title}</span>
                      <ArrowUpRight className="w-3 h-3 text-stone-400 group-hover:text-stone-700 shrink-0 ml-1" />
                    </div>
                    <span className="text-[11px] text-stone-500 font-normal">
                      {lunchRecipe.prepTime + lunchRecipe.cookTime} min
                    </span>
                  </div>
                ) : (
                  <select
                    value=""
                    onChange={(e) => handleUpdateMeal(dayPlan.day, 'lunch', e.target.value)}
                    className="w-full text-xs p-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl text-stone-500 cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-700"
                  >
                    <option value="">+ Choisir un déjeuner</option>
                    {recipes.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                )}
                {lunchRecipe && (
                  <button
                    onClick={() => handleUpdateMeal(dayPlan.day, 'lunch', '')}
                    className="text-[10px] text-stone-400 hover:text-rose-600 cursor-pointer"
                  >
                    Retirer
                  </button>
                )}
              </div>

              {/* Dinner Slot */}
              <div className="space-y-1.5 pt-2 border-t border-stone-100">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-600">
                  Soir
                </div>
                {dinnerRecipe ? (
                  <div
                    onClick={() => onSelectRecipe(dinnerRecipe)}
                    className="p-2.5 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200/80 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-800 line-clamp-1">
                      <span className="truncate">{dinnerRecipe.title}</span>
                      <ArrowUpRight className="w-3 h-3 text-stone-400 group-hover:text-stone-700 shrink-0 ml-1" />
                    </div>
                    <span className="text-[11px] text-stone-500 font-normal">
                      {dinnerRecipe.prepTime + dinnerRecipe.cookTime} min
                    </span>
                  </div>
                ) : (
                  <select
                    value=""
                    onChange={(e) => handleUpdateMeal(dayPlan.day, 'dinner', e.target.value)}
                    className="w-full text-xs p-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl text-stone-500 cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-700"
                  >
                    <option value="">+ Choisir un dîner</option>
                    {recipes.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                )}
                {dinnerRecipe && (
                  <button
                    onClick={() => handleUpdateMeal(dayPlan.day, 'dinner', '')}
                    className="text-[10px] text-stone-400 hover:text-rose-600 cursor-pointer"
                  >
                    Retirer
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
