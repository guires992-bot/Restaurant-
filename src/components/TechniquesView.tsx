import React from 'react';
import { CULINARY_TECHNIQUES, COOKING_TEMPERATURES } from '../data/techniques';
import { BookOpen, Thermometer, Sparkles, ChefHat } from 'lucide-react';

export const TechniquesView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="max-w-2xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
          <ChefHat className="w-4 h-4" />
          <span>Savoir-Faire & Gestuelle</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-stone-900 tracking-tight">
          Techniques de Chefs & Repères Thermiques
        </h2>
        <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed">
          La grande cuisine ne dépend pas d’ingrédients inaccessibles, mais de la maîtrise précise des températures, des émulsions et du respect des sucs.
        </p>
      </div>

      {/* Techniques Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-serif font-bold text-stone-900">
          <BookOpen className="w-4 h-4 text-amber-800" />
          <span>Les Tours de Main Essentiels</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CULINARY_TECHNIQUES.map((tech) => (
            <div
              key={tech.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between space-y-4 shadow-xs hover:border-stone-300 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                  <span>{tech.category}</span>
                  <span className="tabular-nums">{tech.readTime} de lecture</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  {tech.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {tech.description}
                </p>
              </div>

              <div className="p-3.5 bg-amber-50/70 border border-amber-200/60 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Le Geste du Chef :</span>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed">
                  {tech.chefAdvice}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cooking Temperature Guide */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
              <Thermometer className="w-4 h-4" />
              <span>Guide Thermique Précis</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Barème des Cuissons à Cœur
            </h3>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            À vérifier à la sonde de cuisson
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500 text-xs uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Aliment ou Préparation</th>
                <th className="py-3 px-4 font-semibold">Température Cœur</th>
                <th className="py-3 px-4 font-semibold">Repère Organoleptique</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-normal">
              {COOKING_TEMPERATURES.map((item, idx) => (
                <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3 px-4 font-semibold text-stone-900">{item.food}</td>
                  <td className="py-3 px-4 font-mono font-bold text-amber-800 tabular-nums">
                    {item.temp}
                  </td>
                  <td className="py-3 px-4 text-stone-600">{item.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
