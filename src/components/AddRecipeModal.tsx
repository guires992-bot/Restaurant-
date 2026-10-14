import React, { useState } from 'react';
import { Recipe, Category, Difficulty, IngredientCategory } from '../types';
import { X, Plus, Trash2, ChefHat, Check } from 'lucide-react';

interface AddRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRecipe: (recipe: Recipe) => void;
}

export const AddRecipeModal: React.FC<AddRecipeModalProps> = ({
  isOpen,
  onClose,
  onAddRecipe,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<Category>('Plats mijotés');
  const [difficulty, setDifficulty] = useState<Difficulty>('Facile');
  const [prepTime, setPrepTime] = useState<number>(20);
  const [cookTime, setCookTime] = useState<number>(30);
  const [servings, setServings] = useState<number>(4);
  const [description, setDescription] = useState('');
  const [chefTip, setChefTip] = useState('');
  const [winePairing, setWinePairing] = useState('');

  const [ingredients, setIngredients] = useState<
    { name: string; quantity: number; unit: string; category: IngredientCategory }[]
  >([
    { name: '', quantity: 1, unit: 'pièce', category: 'produce' },
    { name: '', quantity: 200, unit: 'g', category: 'pantry' },
  ]);

  const [instructions, setInstructions] = useState<
    { title: string; description: string; durationMinutes?: number }[]
  >([
    { title: 'Préparation des produits', description: '', durationMinutes: 10 },
    { title: 'Cuisson', description: '', durationMinutes: 20 },
  ]);

  const addIngredientRow = () => {
    setIngredients((prev) => [
      ...prev,
      { name: '', quantity: 100, unit: 'g', category: 'produce' },
    ]);
  };

  const removeIngredientRow = (idx: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== idx));
  };

  const addInstructionRow = () => {
    setInstructions((prev) => [
      ...prev,
      { title: `Étape ${prev.length + 1}`, description: '', durationMinutes: 10 },
    ]);
  };

  const removeInstructionRow = (idx: number) => {
    setInstructions((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newRecipe: Recipe = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || 'Recette du carnet personnel',
      category,
      season: 'Toute saison',
      difficulty,
      prepTime: Number(prepTime) || 15,
      cookTime: Number(cookTime) || 20,
      baseServings: Number(servings) || 4,
      image: '/src/assets/images/hero_culinary_bistronomy_1791993473713.jpg',
      description: description.trim() || 'Une délicieuse recette maison à partager en famille ou entre amis.',
      chefTip: chefTip.trim() || undefined,
      winePairing: winePairing.trim() || undefined,
      author: 'Vous',
      nutrition: {
        calories: 450,
        proteins: 22,
        carbs: 45,
        fats: 18,
      },
      ingredients: ingredients
        .filter((ing) => ing.name.trim().length > 0)
        .map((ing, i) => ({
          id: `custom-ing-${Date.now()}-${i}`,
          name: ing.name.trim(),
          quantity: Number(ing.quantity) || 1,
          unit: ing.unit,
          category: ing.category,
        })),
      instructions: instructions
        .filter((ins) => ins.title.trim().length > 0 || ins.description.trim().length > 0)
        .map((ins, i) => ({
          stepNumber: i + 1,
          title: ins.title.trim() || `Étape ${i + 1}`,
          description: ins.description.trim() || 'Poursuivez la préparation.',
          durationMinutes: Number(ins.durationMinutes) || undefined,
        })),
    };

    onAddRecipe(newRecipe);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/90 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-amber-800" />
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                Ajouter une Recette au Carnet
              </h3>
              <p className="text-xs text-stone-500 font-normal">
                Enregistrez vos créations culinaires et secrets de famille
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Main Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Titre de la recette *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Blanquette de Veau à l'Ancienne"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Sous-titre / Brève accroche
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Ex: Sauce blanche onctueuse aux petits champignons et carottes fondantes"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Catégorie
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 cursor-pointer"
              >
                <option value="Plats mijotés">Plats mijotés</option>
                <option value="Entrées">Entrées</option>
                <option value="Pâtisserie & Desserts">Pâtisserie & Desserts</option>
                <option value="Végétarien">Végétarien</option>
                <option value="Rapide & Facile">Rapide & Facile</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Difficulté
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 cursor-pointer"
              >
                <option value="Facile">Facile</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Avancé">Avancé</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Préparation (minutes)
              </label>
              <input
                type="number"
                min="1"
                value={prepTime}
                onChange={(e) => setPrepTime(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Cuisson (minutes)
              </label>
              <input
                type="number"
                min="0"
                value={cookTime}
                onChange={(e) => setCookTime(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Histoire / Description du plat
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Racontez les secrets de ce plat..."
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700"
            />
          </div>

          {/* Ingredients Section */}
          <div className="space-y-3 pt-2 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Ingrédients
              </label>
              <button
                type="button"
                onClick={addIngredientRow}
                className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ajouter un ingrédient</span>
              </button>
            </div>

            <div className="space-y-2">
              {ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={ing.name}
                    onChange={(e) => {
                      const val = e.target.value;
                      setIngredients((prev) =>
                        prev.map((item, i) => (i === idx ? { ...item, name: val } : item))
                      );
                    }}
                    placeholder="Nom (ex: Farine de blé)"
                    className="flex-1 px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                  />
                  <input
                    type="number"
                    value={ing.quantity}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setIngredients((prev) =>
                        prev.map((item, i) => (i === idx ? { ...item, quantity: val } : item))
                      );
                    }}
                    className="w-20 px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    value={ing.unit}
                    onChange={(e) => {
                      const val = e.target.value;
                      setIngredients((prev) =>
                        prev.map((item, i) => (i === idx ? { ...item, unit: val } : item))
                      );
                    }}
                    placeholder="g / ml / pièce"
                    className="w-20 px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredientRow(idx)}
                      className="p-1.5 text-stone-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Instructions Steps */}
          <div className="space-y-3 pt-2 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Étapes de préparation
              </label>
              <button
                type="button"
                onClick={addInstructionRow}
                className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ajouter une étape</span>
              </button>
            </div>

            <div className="space-y-3">
              {instructions.map((ins, idx) => (
                <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-stone-700 font-serif">
                      Étape {idx + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={ins.durationMinutes || ''}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setInstructions((prev) =>
                            prev.map((item, i) =>
                              i === idx ? { ...item, durationMinutes: val } : item
                            )
                          );
                        }}
                        placeholder="Min."
                        className="w-16 px-2 py-1 text-xs bg-white border border-stone-300 rounded-md"
                      />
                      {instructions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeInstructionRow(idx)}
                          className="p-1 text-stone-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                  <input
                    type="text"
                    value={ins.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      setInstructions((prev) =>
                        prev.map((item, i) => (i === idx ? { ...item, title: val } : item))
                      );
                    }}
                    placeholder="Titre de l'étape (ex: Déglaçage des oignons)"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                  />
                  <textarea
                    rows={2}
                    value={ins.description}
                    onChange={(e) => {
                      const val = e.target.value;
                      setInstructions((prev) =>
                        prev.map((item, i) => (i === idx ? { ...item, description: val } : item))
                      );
                    }}
                    placeholder="Explications détaillées du geste..."
                    className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-stone-900 text-white font-semibold text-xs rounded-xl hover:bg-stone-800 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Enregistrer la recette</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
