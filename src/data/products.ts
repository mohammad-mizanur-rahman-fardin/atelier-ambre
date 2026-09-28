export interface OlfactoryNote {
  name: string;
  icon?: string;
}

export interface OlfactoryPyramid {
  top: OlfactoryNote[];
  heart: OlfactoryNote[];
  base: OlfactoryNote[];
}

export type ScentFamily = 'Woody' | 'Oriental' | 'Floral' | 'Fresh' | 'Oud' | 'Amber';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  scentFamily: ScentFamily;
  pyramid: OlfactoryPyramid;
  price50ml: number;
  price100ml: number;
  stock: number;
  sillage: 'Intimate' | 'Moderate' | 'Strong' | 'Enormous';
  longevity: number; // hours
  imageUrl: string;
  imageBg: string; // gradient bg for card fallback
  featured: boolean;
  tags: string[];
}

export const products: Product[] = [
  {
    id: 'oud-noir',
    name: 'Oud Noir',
    subtitle: 'The Darkness Within',
    description: 'A deeply enigmatic composition where rare Cambodian oud intertwines with smoky leather and midnight rose, evoking the mystique of moonlit bazaars in old Dhaka.',
    scentFamily: 'Oud',
    pyramid: {
      top: [{ name: 'Saffron' }, { name: 'Pink Pepper' }, { name: 'Bergamot' }],
      heart: [{ name: 'Rose Absolute' }, { name: 'Cambodian Oud' }, { name: 'Leather' }],
      base: [{ name: 'Musk' }, { name: 'Amber' }, { name: 'Sandalwood' }],
    },
    price50ml: 4500,
    price100ml: 7800,
    stock: 24,
    sillage: 'Enormous',
    longevity: 12,
    imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea081ae7aef?w=600&h=800&fit=crop&q=80',
    imageBg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    featured: true,
    tags: ['Bestseller', 'Evening'],
  },
  {
    id: 'amber-royale',
    name: 'Amber Royale',
    subtitle: 'Crowned in Warmth',
    description: 'A regal amber symphony that wraps the wearer in cascading waves of Baltic amber resin, vanilla orchid, and golden benzoin — truly fit for royalty.',
    scentFamily: 'Amber',
    pyramid: {
      top: [{ name: 'Mandarin Orange' }, { name: 'Cardamom' }, { name: 'Cinnamon' }],
      heart: [{ name: 'Amber Resin' }, { name: 'Vanilla Orchid' }, { name: 'Jasmine Sambac' }],
      base: [{ name: 'Benzoin' }, { name: 'Tonka Bean' }, { name: 'Vetiver' }],
    },
    price50ml: 3800,
    price100ml: 6500,
    stock: 38,
    sillage: 'Strong',
    longevity: 10,
    imageUrl: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&h=800&fit=crop&q=80',
    imageBg: 'linear-gradient(135deg, #92400e 0%, #78350f 50%, #451a03 100%)',
    featured: true,
    tags: ['Signature', 'All Day'],
  },
  {
    id: 'bergamot-velvet',
    name: 'Bergamot Velvet',
    subtitle: 'Sunlit Elegance',
    description: 'An effervescent citrus opening of Calabrian bergamot cascades into a plush velvet heart of iris and violet, resting on a cushion of creamy musks.',
    scentFamily: 'Fresh',
    pyramid: {
      top: [{ name: 'Bergamot' }, { name: 'Lemon Zest' }, { name: 'Green Apple' }],
      heart: [{ name: 'Iris' }, { name: 'Violet' }, { name: 'White Tea' }],
      base: [{ name: 'White Musk' }, { name: 'Cedarwood' }, { name: 'Ambrette Seed' }],
    },
    price50ml: 3200,
    price100ml: 5500,
    stock: 45,
    sillage: 'Moderate',
    longevity: 8,
    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=800&fit=crop&q=80',
    imageBg: 'linear-gradient(135deg, #365314 0%, #3f6212 50%, #4d7c0f 100%)',
    featured: true,
    tags: ['Fresh', 'Daytime'],
  },
  {
    id: 'rose-de-soie',
    name: 'Rose de Soie',
    subtitle: 'Petals of Silk',
    description: 'A haute couture rose rendered in silk — Turkish rose attar meets dewy peony and litchi, layered over a whisper of praline and cashmere wood.',
    scentFamily: 'Floral',
    pyramid: {
      top: [{ name: 'Litchi' }, { name: 'Peony' }, { name: 'Raspberry' }],
      heart: [{ name: 'Turkish Rose' }, { name: 'Magnolia' }, { name: 'Peach Blossom' }],
      base: [{ name: 'Praline' }, { name: 'Cashmere Wood' }, { name: 'White Musk' }],
    },
    price50ml: 3500,
    price100ml: 6000,
    stock: 30,
    sillage: 'Moderate',
    longevity: 9,
    imageUrl: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&h=800&fit=crop&q=80',
    imageBg: 'linear-gradient(135deg, #831843 0%, #9d174d 50%, #be185d 100%)',
    featured: false,
    tags: ['Romantic', 'Spring'],
  },
  {
    id: 'santal-mystique',
    name: 'Santal Mystique',
    subtitle: 'Sacred Wood Ritual',
    description: 'A meditative journey through ancient sandalwood groves — mysore sandalwood core embraced by frankincense smoke, sacred lotus, and earthy patchouli.',
    scentFamily: 'Woody',
    pyramid: {
      top: [{ name: 'Frankincense' }, { name: 'Elemi' }, { name: 'Pink Pepper' }],
      heart: [{ name: 'Mysore Sandalwood' }, { name: 'Sacred Lotus' }, { name: 'Orris Root' }],
      base: [{ name: 'Patchouli' }, { name: 'Vetiver' }, { name: 'Labdanum' }],
    },
    price50ml: 4200,
    price100ml: 7200,
    stock: 18,
    sillage: 'Strong',
    longevity: 11,
    imageUrl: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600&h=800&fit=crop&q=80',
    imageBg: 'linear-gradient(135deg, #44403c 0%, #292524 50%, #1c1917 100%)',
    featured: true,
    tags: ['Unisex', 'Meditation'],
  },
  {
    id: 'jasmine-imperiale',
    name: 'Jasmine Impériale',
    subtitle: 'Night-Blooming Majesty',
    description: 'Midnight-harvested Grasse jasmine in its most opulent form — a narcotic white floral bouquet intensified by tuberose and ylang-ylang, anchored in precious oud.',
    scentFamily: 'Floral',
    pyramid: {
      top: [{ name: 'Neroli' }, { name: 'Mandarin' }, { name: 'Green Notes' }],
      heart: [{ name: 'Jasmine Absolute' }, { name: 'Tuberose' }, { name: 'Ylang-Ylang' }],
      base: [{ name: 'Oud' }, { name: 'Amber' }, { name: 'Vanilla' }],
    },
    price50ml: 4800,
    price100ml: 8200,
    stock: 12,
    sillage: 'Enormous',
    longevity: 14,
    imageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&h=800&fit=crop&q=80',
    imageBg: 'linear-gradient(135deg, #4a1942 0%, #2d1b69 50%, #1e1b4b 100%)',
    featured: false,
    tags: ['Luxe', 'Evening'],
  },
  {
    id: 'vetiver-obscur',
    name: 'Vetiver Obscur',
    subtitle: 'Earth Unchained',
    description: 'Raw, untamed Haitian vetiver meets smoky guaiac wood and black pepper — a fragrance of primal sophistication for those who walk their own path.',
    scentFamily: 'Woody',
    pyramid: {
      top: [{ name: 'Black Pepper' }, { name: 'Grapefruit' }, { name: 'Nutmeg' }],
      heart: [{ name: 'Haitian Vetiver' }, { name: 'Geranium' }, { name: 'Violet Leaf' }],
      base: [{ name: 'Guaiac Wood' }, { name: 'Oakmoss' }, { name: 'Dry Amber' }],
    },
    price50ml: 3600,
    price100ml: 6200,
    stock: 42,
    sillage: 'Strong',
    longevity: 10,
    imageUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&h=800&fit=crop&q=80',
    imageBg: 'linear-gradient(135deg, #1a2e05 0%, #14532d 50%, #064e3b 100%)',
    featured: false,
    tags: ['Masculine', 'All Season'],
  },
  {
    id: 'iris-platine',
    name: 'Iris Platine',
    subtitle: 'Powder & Light',
    description: 'The most refined expression of Florentine iris — powdery, ethereal, and luminous. A silver thread of aldehydes lifts the creamy orris to celestial heights.',
    scentFamily: 'Floral',
    pyramid: {
      top: [{ name: 'Aldehydes' }, { name: 'Pink Pepper' }, { name: 'Silver Birch' }],
      heart: [{ name: 'Florentine Iris' }, { name: 'Orris Butter' }, { name: 'Heliotrope' }],
      base: [{ name: 'White Musk' }, { name: 'Cashmeran' }, { name: 'Blonde Wood' }],
    },
    price50ml: 5200,
    price100ml: 9000,
    stock: 8,
    sillage: 'Moderate',
    longevity: 9,
    imageUrl: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=600&h=800&fit=crop&q=80',
    imageBg: 'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 50%, #7c3aed 100%)',
    featured: false,
    tags: ['Ultra Luxe', 'Limited'],
  },
];

export const scentFamilies: ScentFamily[] = ['Woody', 'Oriental', 'Floral', 'Fresh', 'Oud', 'Amber'];
