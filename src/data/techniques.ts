import { CulinaryTechnique } from '../types';

export const CULINARY_TECHNIQUES: CulinaryTechnique[] = [
  {
    id: 'deglacage-sucs',
    title: 'L’Art du Déglaçage des Sucs',
    category: 'Sauces & Fonds',
    description: 'Dissoudre les sucs de caramélisation attachés au fond de la poêle avec un liquide froid ou tiède (vin, bouillon, crème) pour créer une sauce d’une intensité incomparable.',
    chefAdvice: 'Attendez que les sucs soient noisette foncé sans brûler. Versez le liquide hors du feu puis grattez immédiatement avec une spatule en bois.',
    difficulty: 'Facile',
    readTime: '3 min',
  },
  {
    id: 'emulsion-beurre-monte',
    title: 'Monter une Sauce au Beurre Froid',
    category: 'Sauces & Émulsions',
    description: 'Le secret des chefs pour donner brillance et onctuosité aux sauces de poisson ou de viande sans utiliser de farine.',
    chefAdvice: 'Le beurre doit être très froid (sortant du congélateur ou frigo). Incorporez-le par petits morceaux hors du feu en fouettant en continu pour créer l’émulsion mécanique sans le clarifier.',
    difficulty: 'Intermédiaire',
    readTime: '4 min',
  },
  {
    id: 'taillage-legumes',
    title: 'Les Tailles Clés : Brunoise & Julienne',
    category: 'Technique du Couteau',
    description: 'La découpe régulière des légumes n’est pas qu’esthétique : elle garantit une cuisson parfaitement homogène de tous les morceaux.',
    chefAdvice: 'Julienne : filaments fins de 1 mm d’épaisseur sur 4-5 cm de long. Brunoise : petits dés de 2 mm obtenus en recoupant la julienne.',
    difficulty: 'Facile',
    readTime: '5 min',
  },
  {
    id: 'cuisson-viande-repos',
    title: 'Le Repos Post-Cuisson des Viandes',
    category: 'Cuissons & Températures',
    description: 'Pourquoi et comment laisser reposer une côte de bœuf ou un rôti avant de le découper pour conserver 100% du jus.',
    chefAdvice: 'Comptez un temps de repos égal à la moitié du temps de cuisson. Couvrez d’un papier sulfurisé sans enfermer hermétiquement la vapeur pour préserver le croustillant de la croûte.',
    difficulty: 'Facile',
    readTime: '3 min',
  },
];

export const COOKING_TEMPERATURES = [
  { food: 'Bœuf saignant', temp: '52°C - 55°C', detail: 'Cœur rouge vif, chaud et très tendre' },
  { food: 'Bœuf à point', temp: '58°C - 60°C', detail: 'Cœur rosé et bords cuits' },
  { food: 'Volaille fermière', temp: '74°C', detail: 'Cuite à cœur, jus limpide sans traces rosées' },
  { food: 'Poisson nacré (Saumon/Cabillaud)', temp: '48°C - 52°C', detail: 'Lamelles qui se détachent délicatement' },
  { food: 'Caramel blond à brun', temp: '160°C - 175°C', detail: 'Arôme noisette, au-delà il devient amer' },
];
