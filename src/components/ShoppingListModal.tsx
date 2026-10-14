import React, { useState } from 'react';
import { ShoppingItem, IngredientCategory } from '../types';
import { X, Check, Trash2, Copy, Plus, CheckSquare, Square, ShoppingBag } from 'lucide-react';

interface ShoppingListModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ShoppingItem[];
  setItems: React.Dispatch<React.SetStateAction<ShoppingItem[]>>;
}

const CATEGORY_LABELS: Record<IngredientCategory, string> = {
  produce: 'Fruits & Légumes du Marché',
  meat: 'Boucherie, Charcuterie & Poissonnerie',
  dairy: 'Crèmerie & Produits Laitiers',
  bakery: 'Boulangerie & Pâtes',
  pantry: 'Épicerie, Vins & Huiles',
  spices: 'Épices, Sel & Herbes Aromatiques',
};

export const ShoppingListModal: React.FC<ShoppingListModalProps> = ({
  isOpen,
  onClose,
  items,
  setItems,
}) => {
  if (!isOpen) return null;

  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState('');
  const [copied, setCopied] = useState(false);

  const toggleCheck = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const newItem: ShoppingItem = {
      id: `manual-${Date.now()}`,
      name: newItemName.trim(),
      quantity: newItemQty.trim() || '1',
      category: 'pantry',
      checked: false,
      recipeSource: 'Ajout manuel',
    };
    setItems((prev) => [newItem, ...prev]);
    setNewItemName('');
    setNewItemQty('');
  };

  const handleClearCompleted = () => {
    setItems((prev) => prev.filter((i) => !i.checked));
  };

  const handleClearAll = () => {
    if (confirm('Voulez-vous vider l’ensemble de votre liste de courses ?')) {
      setItems([]);
    }
  };

  const handleCopyClipboard = () => {
    if (items.length === 0) return;
    const text = items
      .map((i) => `${i.checked ? '✓ ' : '□ '} ${i.name} (${i.quantity})`)
      .join('\n');
    navigator.clipboard?.writeText(`Mon Panier de Courses - L'Atelier Culinaire :\n\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categories: IngredientCategory[] = ['produce', 'meat', 'dairy', 'bakery', 'pantry', 'spices'];
  const remainingCount = items.filter((i) => !i.checked).length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/90 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-800" />
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                Liste de Courses
              </h3>
              <p className="text-xs text-stone-500 font-normal">
                {items.length === 0
                  ? 'Votre liste est vide'
                  : `${remainingCount} article${remainingCount > 1 ? 's' : ''} à acheter`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={handleCopyClipboard}
                title="Copier la liste pour SMS / WhatsApp"
                className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer flex items-center gap-1 text-xs font-medium"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">{copied ? 'Copié !' : 'Partager'}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Quick Add Form */}
          <form onSubmit={handleAddItem} className="flex gap-2">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Ajouter un article (ex: Beurre d'Isigny, Sel de Guérande...)"
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700"
            />
            <input
              type="text"
              value={newItemQty}
              onChange={(e) => setNewItemQty(e.target.value)}
              placeholder="Quantité (ex: 250g)"
              className="w-28 px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700"
            />
            <button
              type="submit"
              className="px-3.5 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Ajouter</span>
            </button>
          </form>

          {/* Items by Category */}
          {items.length === 0 ? (
            <div className="py-12 text-center text-stone-400 space-y-2">
              <ShoppingBag className="w-10 h-10 mx-auto text-stone-300" />
              <p className="text-sm font-serif text-stone-600">Aucun ingrédient dans votre liste</p>
              <p className="text-xs text-stone-400 max-w-xs mx-auto">
                Ouvrez une fiche recette et cliquez sur "Ajouter à ma liste de courses" ou planifiez votre menu de la semaine.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {categories.map((catKey) => {
                const catItems = items.filter((i) => i.category === catKey);
                if (catItems.length === 0) return null;

                return (
                  <div key={catKey} className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 border-b border-stone-100 pb-1">
                      {CATEGORY_LABELS[catKey]}
                    </h4>
                    <div className="space-y-1.5">
                      {catItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => toggleCheck(item.id)}
                          className={`flex items-center justify-between p-2.5 rounded-lg border transition-all cursor-pointer ${
                            item.checked
                              ? 'bg-stone-50/70 border-stone-200/50 text-stone-400'
                              : 'bg-white border-stone-200/80 text-stone-800 hover:border-amber-700/40'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {item.checked ? (
                              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                            ) : (
                              <Square className="w-4 h-4 text-stone-300 shrink-0" />
                            )}
                            <div className="flex flex-col">
                              <span
                                className={`text-xs sm:text-sm font-medium ${
                                  item.checked ? 'line-through text-stone-400' : 'text-stone-800'
                                }`}
                              >
                                {item.name}
                              </span>
                              {item.recipeSource && (
                                <span className="text-[10px] text-stone-400">
                                  {item.recipeSource}
                                </span>
                              )}
                            </div>
                          </div>

                          <span className="text-xs font-semibold font-mono tabular-nums text-stone-700 ml-2">
                            {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50/90 flex items-center justify-between text-xs">
            <button
              onClick={handleClearCompleted}
              className="text-stone-600 hover:text-stone-900 font-medium cursor-pointer"
            >
              Supprimer les articles cochés
            </button>
            <button
              onClick={handleClearAll}
              className="text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Tout effacer</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
