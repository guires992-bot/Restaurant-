export type Category = 'Toutes' | 'Entrées' | 'Plats mijotés' | 'Pâtisserie & Desserts' | 'Végétarien' | 'Rapide & Facile';

export type Season = 'Toutes' | 'Printemps' | 'Été' | 'Automne' | 'Hiver' | 'Toute saison';

export type Difficulty = 'Facile' | 'Intermédiaire' | 'Avancé';

export type IngredientCategory = 'produce' | 'dairy' | 'meat' | 'bakery' | 'pantry' | 'spices';

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: IngredientCategory;
}

export interface InstructionStep {
  stepNumber: number;
  title: string;
  description: string;
  durationMinutes?: number;
  tip?: string;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  season: Season;
  difficulty: Difficulty;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  restTime?: number; // in minutes
  baseServings: number;
  image: string;
  description: string;
  ingredients: Ingredient[];
  instructions: InstructionStep[];
  chefTip?: string;
  winePairing?: string;
  nutrition: {
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
  };
  featured?: boolean;
  author?: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: IngredientCategory;
  checked: boolean;
  recipeSource?: string;
}

export interface DayPlan {
  day: string;
  lunchRecipeId?: string;
  dinnerRecipeId?: string;
}

export interface CulinaryTechnique {
  id: string;
  title: string;
  category: string;
  description: string;
  chefAdvice: string;
  difficulty: 'Facile' | 'Intermédiaire' | 'Avancé';
  readTime: string;
}
