import React, { useState } from 'react';
import { Recipe } from '../types';
import { Heart, Clock, UtensilsCrossed, CalendarPlus } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onAddToPlanner?: (id: string) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onSelect,
  isFavorite,
  onToggleFavorite,
  onAddToPlanner,
}) => {
  const [imageError, setImageError] = useState(false);

  const totalTime = recipe.prepTime + recipe.cookTime;
  const formattedTime = totalTime >= 60 
    ? `${Math.floor(totalTime / 60)}h${totalTime % 60 ? `${totalTime % 60}m` : ''}`
    : `${totalTime} min`;

  return (
    <article
      onClick={() => onSelect(recipe)}
      className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-stone-300 hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Visual Slot */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        {!imageError && recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-stone-100 text-stone-400">
            <UtensilsCrossed className="w-10 h-10 mb-2 text-stone-300" />
            <span className="text-xs font-serif text-stone-500">{recipe.title}</span>
          </div>
        )}

        {/* Favorite Bookmark Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(recipe.id);
          }}
          aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/85 hover:bg-white text-stone-700 hover:text-rose-600 transition-all shadow-xs backdrop-blur-xs cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-rose-600 text-rose-600' : 'text-stone-700'
            }`}
          />
        </button>

        {/* Optional quick add to meal plan */}
        {onAddToPlanner && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToPlanner(recipe.id);
            }}
            title="Ajouter au menu de la semaine"
            className="absolute bottom-3 right-3 p-2 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white transition-all shadow-xs backdrop-blur-xs cursor-pointer opacity-0 group-hover:opacity-100 duration-200"
          >
            <CalendarPlus className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Unboxed clean text metadata with typographic separators */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            <span>{recipe.category}</span>
            <span aria-hidden="true">·</span>
            <span>{recipe.difficulty}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{recipe.baseServings} pers.</span>
          </div>

          <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug line-clamp-1">
            {recipe.title}
          </h3>

          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed font-normal">
            {recipe.description}
          </p>
        </div>

        {/* Card Footer */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-medium">
          <div className="flex items-center gap-1 text-stone-600">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span className="tabular-nums">{formattedTime}</span>
          </div>

          <span className="text-amber-800 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
            Voir la recette &rarr;
          </span>
        </div>
      </div>
    </article>
  );
};
