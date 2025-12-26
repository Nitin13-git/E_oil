export interface Product {
  id: string;
  slug: string;
  name: string;
  botanicalName: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  benefits: string[];
  uses: string[];
  ingredients: string;
  size: string;
  inStock: boolean;
  featured: boolean;
  bestSeller: boolean;
  labelColor: string;
  accentColor: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Essential Oils',
    slug: 'essential-oils',
    description: 'Pure, natural essential oils extracted from aromatic plants',
    icon: '🌿'
  },
  {
    id: '2',
    name: 'Carrier Oils',
    slug: 'carrier-oils',
    description: 'Premium base oils for diluting essential oils',
    icon: '🫒'
  },
  {
    id: '3',
    name: 'Floral Waters',
    slug: 'floral-waters',
    description: 'Hydrosols and floral waters for skincare and aromatherapy',
    icon: '💧'
  },
  {
    id: '4',
    name: 'Absolute Oils',
    slug: 'absolute-oils',
    description: 'Highly concentrated aromatic oils from delicate flowers',
    icon: '🌸'
  },
  {
    id: '5',
    name: 'Herbal Extracts',
    slug: 'herbal-extracts',
    description: 'Natural herbal extracts and cosmetic butters',
    icon: '🌱'
  },
  {
    id: '6',
    name: 'Ayurvedic Products',
    slug: 'ayurvedic-products',
    description: 'Traditional Ayurvedic oils and formulations',
    icon: '🕉️'
  }
];

export const products: Product[] = [
  {
    id: '1',
    slug: 'lavender-essential-oil',
    name: 'Lavender Essential Oil',
    botanicalName: 'Lavandula angustifolia',
    category: 'essential-oils',
    price: 24.99,
    rating: 5.0,
    reviews: 328,
    description: 'Our premium Lavender Essential Oil is steam-distilled from the finest French lavender flowers, capturing the pure essence of relaxation. This therapeutic-grade oil features a sweet, floral aroma with herbaceous undertones that promotes calm and tranquility.',
    benefits: ['Promotes relaxation and restful sleep', 'Soothes skin irritations', 'Natural stress relief', 'Enhances mood and emotional balance'],
    uses: ['Add to diffuser for calming aromatherapy', 'Mix with carrier oil for massage', 'Add drops to bath water', 'Apply to pillow for better sleep'],
    ingredients: '100% Pure Lavandula angustifolia (Lavender) Oil',
    size: '15ml',
    inStock: true,
    featured: true,
    bestSeller: true,
    labelColor: '#9b7bb8',
    accentColor: '#7c5a9e'
  },
  {
    id: '2',
    slug: 'peppermint-essential-oil',
    name: 'Peppermint Essential Oil',
    botanicalName: 'Mentha piperita',
    category: 'essential-oils',
    price: 19.99,
    rating: 4.9,
    reviews: 256,
    description: 'Invigorate your senses with our premium Peppermint Essential Oil. Steam-distilled from organically grown peppermint leaves, this oil delivers a cool, refreshing menthol aroma that awakens the mind and energizes the body.',
    benefits: ['Boosts mental clarity and focus', 'Relieves headache discomfort', 'Supports respiratory health', 'Natural energy booster'],
    uses: ['Inhale directly for quick energy', 'Apply diluted to temples for headaches', 'Add to diffuser for mental clarity', 'Use in DIY cooling sprays'],
    ingredients: '100% Pure Mentha piperita (Peppermint) Oil',
    size: '15ml',
    inStock: true,
    featured: true,
    bestSeller: true,
    labelColor: '#4ade80',
    accentColor: '#22c55e'
  },
  {
    id: '3',
    slug: 'eucalyptus-essential-oil',
    name: 'Eucalyptus Essential Oil',
    botanicalName: 'Eucalyptus globulus',
    category: 'essential-oils',
    price: 18.99,
    rating: 4.8,
    reviews: 189,
    description: 'Breathe easy with our therapeutic Eucalyptus Essential Oil. Sourced from Australian eucalyptus trees and steam-distilled to perfection, this oil features a clean, camphoraceous scent that clears the airways and refreshes the spirit.',
    benefits: ['Supports clear breathing', 'Natural decongestant', 'Purifies the air', 'Relieves muscle tension'],
    uses: ['Steam inhalation for congestion', 'Add to chest rubs', 'Diffuse during cold season', 'Use in cleaning solutions'],
    ingredients: '100% Pure Eucalyptus globulus (Eucalyptus) Oil',
    size: '15ml',
    inStock: true,
    featured: true,
    bestSeller: true,
    labelColor: '#60a5fa',
    accentColor: '#3b82f6'
  },
  {
    id: '4',
    slug: 'tea-tree-essential-oil',
    name: 'Tea Tree Essential Oil',
    botanicalName: 'Melaleuca alternifolia',
    category: 'essential-oils',
    price: 21.99,
    rating: 4.9,
    reviews: 412,
    description: 'Discover the powerful purifying properties of our Tea Tree Essential Oil. Steam-distilled from Australian Melaleuca leaves, this versatile oil is renowned for its cleansing properties and fresh, medicinal aroma.',
    benefits: ['Natural antibacterial properties', 'Supports healthy skin', 'Purifies surfaces', 'Promotes scalp health'],
    uses: ['Add to skincare routine', 'Use in natural cleaning products', 'Apply to blemishes', 'Add to shampoo for scalp care'],
    ingredients: '100% Pure Melaleuca alternifolia (Tea Tree) Oil',
    size: '15ml',
    inStock: true,
    featured: false,
    bestSeller: true,
    labelColor: '#a3e635',
    accentColor: '#84cc16'
  },
  {
    id: '5',
    slug: 'lemongrass-essential-oil',
    name: 'Lemongrass Essential Oil',
    botanicalName: 'Cymbopogon citratus',
    category: 'essential-oils',
    price: 16.99,
    rating: 4.7,
    reviews: 178,
    description: 'Uplift your mood with our vibrant Lemongrass Essential Oil. Steam-distilled from fresh lemongrass stalks, this oil features a bright, citrusy aroma with earthy undertones that energizes and refreshes.',
    benefits: ['Natural insect repellent', 'Uplifts mood and reduces stress', 'Supports healthy digestion', 'Purifies the air naturally'],
    uses: ['Diffuse for uplifting aroma', 'Add to DIY insect repellents', 'Use in massage blends', 'Add to natural cleaners'],
    ingredients: '100% Pure Cymbopogon citratus (Lemongrass) Oil',
    size: '15ml',
    inStock: true,
    featured: true,
    bestSeller: false,
    labelColor: '#fbbf24',
    accentColor: '#f59e0b'
  },
  {
    id: '6',
    slug: 'frankincense-essential-oil',
    name: 'Frankincense Essential Oil',
    botanicalName: 'Boswellia serrata',
    category: 'essential-oils',
    price: 34.99,
    rating: 5.0,
    reviews: 203,
    description: 'Experience ancient wisdom with our premium Frankincense Essential Oil. Steam-distilled from the sacred Boswellia resin, this oil features a warm, spicy-sweet aroma that promotes meditation and spiritual connection.',
    benefits: ['Promotes cellular health', 'Supports meditation practice', 'Reduces appearance of aging', 'Calms the mind'],
    uses: ['Diffuse during meditation', 'Add to anti-aging skincare', 'Apply to pulse points', 'Use in spiritual practices'],
    ingredients: '100% Pure Boswellia serrata (Frankincense) Oil',
    size: '15ml',
    inStock: true,
    featured: true,
    bestSeller: false,
    labelColor: '#d4a853',
    accentColor: '#b8860b'
  },
  {
    id: '7',
    slug: 'rosemary-essential-oil',
    name: 'Rosemary Essential Oil',
    botanicalName: 'Rosmarinus officinalis',
    category: 'essential-oils',
    price: 17.99,
    rating: 4.8,
    reviews: 145,
    description: 'Stimulate your senses with our herbaceous Rosemary Essential Oil. Steam-distilled from flowering rosemary tops, this oil features a fresh, camphoraceous aroma that promotes mental clarity and focus.',
    benefits: ['Enhances memory and concentration', 'Supports hair growth', 'Relieves muscle fatigue', 'Stimulates circulation'],
    uses: ['Diffuse while studying', 'Add to hair care products', 'Use in massage for sore muscles', 'Inhale for mental clarity'],
    ingredients: '100% Pure Rosmarinus officinalis (Rosemary) Oil',
    size: '15ml',
    inStock: true,
    featured: false,
    bestSeller: false,
    labelColor: '#6b8e4e',
    accentColor: '#4a6741'
  },
  {
    id: '8',
    slug: 'sweet-orange-essential-oil',
    name: 'Sweet Orange Essential Oil',
    botanicalName: 'Citrus sinensis',
    category: 'essential-oils',
    price: 14.99,
    rating: 4.9,
    reviews: 267,
    description: 'Brighten your day with our cheerful Sweet Orange Essential Oil. Cold-pressed from fresh orange peels, this oil captures the pure, sweet citrus aroma that uplifts mood and energizes the spirit.',
    benefits: ['Elevates mood naturally', 'Supports immune function', 'Freshens any space', 'Reduces anxiety and stress'],
    uses: ['Diffuse for cheerful atmosphere', 'Add to cleaning products', 'Use in DIY skincare', 'Blend with other oils'],
    ingredients: '100% Pure Citrus sinensis (Sweet Orange) Oil',
    size: '15ml',
    inStock: true,
    featured: false,
    bestSeller: true,
    labelColor: '#fb923c',
    accentColor: '#f97316'
  },
  {
    id: '9',
    slug: 'jojoba-carrier-oil',
    name: 'Jojoba Carrier Oil',
    botanicalName: 'Simmondsia chinensis',
    category: 'carrier-oils',
    price: 22.99,
    rating: 4.9,
    reviews: 198,
    description: 'Our premium Golden Jojoba Oil is cold-pressed from organic jojoba seeds. This liquid wax closely resembles skin\'s natural sebum, making it perfect for all skin types and an ideal carrier for essential oils.',
    benefits: ['Balances skin oil production', 'Deeply moisturizing', 'Non-comedogenic', 'Long shelf life'],
    uses: ['Use as massage oil base', 'Add to skincare routine', 'Mix with essential oils', 'Apply as hair treatment'],
    ingredients: '100% Pure Simmondsia chinensis (Jojoba) Oil',
    size: '100ml',
    inStock: true,
    featured: true,
    bestSeller: true,
    labelColor: '#eab308',
    accentColor: '#ca8a04'
  },
  {
    id: '10',
    slug: 'sweet-almond-carrier-oil',
    name: 'Sweet Almond Carrier Oil',
    botanicalName: 'Prunus dulcis',
    category: 'carrier-oils',
    price: 18.99,
    rating: 4.8,
    reviews: 156,
    description: 'Our Sweet Almond Oil is cold-pressed from premium quality almonds. This lightweight, nourishing oil absorbs easily and is rich in vitamins E and K, perfect for massage and skincare applications.',
    benefits: ['Rich in vitamins E and K', 'Softens and nourishes skin', 'Reduces dark circles', 'Gentle for sensitive skin'],
    uses: ['Base for massage blends', 'Apply as moisturizer', 'Use for makeup removal', 'Add to bath water'],
    ingredients: '100% Pure Prunus dulcis (Sweet Almond) Oil',
    size: '100ml',
    inStock: true,
    featured: false,
    bestSeller: false,
    labelColor: '#fcd34d',
    accentColor: '#fbbf24'
  },
  {
    id: '11',
    slug: 'rose-water-hydrosol',
    name: 'Rose Water Hydrosol',
    botanicalName: 'Rosa damascena',
    category: 'floral-waters',
    price: 19.99,
    rating: 5.0,
    reviews: 234,
    description: 'Our pure Rose Water is steam-distilled from fresh Damascus rose petals. This gentle hydrosol captures the romantic floral essence, perfect for skincare, aromatherapy, and culinary uses.',
    benefits: ['Balances skin pH', 'Reduces redness and inflammation', 'Natural toner', 'Romantic aromatherapy'],
    uses: ['Use as facial toner', 'Set makeup naturally', 'Add to baths', 'Mist for aromatherapy'],
    ingredients: '100% Pure Rosa damascena (Rose) Hydrosol',
    size: '200ml',
    inStock: true,
    featured: true,
    bestSeller: true,
    labelColor: '#f472b6',
    accentColor: '#ec4899'
  },
  {
    id: '12',
    slug: 'jasmine-absolute-oil',
    name: 'Jasmine Absolute Oil',
    botanicalName: 'Jasminum grandiflorum',
    category: 'absolute-oils',
    price: 89.99,
    rating: 5.0,
    reviews: 87,
    description: 'Our luxurious Jasmine Absolute is solvent-extracted from fresh jasmine flowers harvested at night when their fragrance is most intense. This precious oil features an intoxicating, rich floral aroma.',
    benefits: ['Promotes feelings of romance', 'Supports emotional balance', 'Natural aphrodisiac', 'Nourishes mature skin'],
    uses: ['Add to perfume blends', 'Use in romantic diffuser blends', 'Add to luxury skincare', 'Apply as natural perfume'],
    ingredients: '100% Pure Jasminum grandiflorum (Jasmine) Absolute',
    size: '5ml',
    inStock: true,
    featured: true,
    bestSeller: false,
    labelColor: '#fef3c7',
    accentColor: '#fcd34d'
  },
  {
    id: '13',
    slug: 'shea-butter',
    name: 'Raw Shea Butter',
    botanicalName: 'Vitellaria paradoxa',
    category: 'herbal-extracts',
    price: 24.99,
    rating: 4.9,
    reviews: 312,
    description: 'Our unrefined Shea Butter is ethically sourced from West Africa. This rich, creamy butter is packed with vitamins A and E, providing deep nourishment for skin and hair.',
    benefits: ['Intense moisturization', 'Reduces stretch marks', 'Soothes dry skin', 'Natural sun protection'],
    uses: ['Apply directly to skin', 'Make DIY body butters', 'Use as hair mask', 'Add to lip balms'],
    ingredients: '100% Pure Vitellaria paradoxa (Shea) Butter',
    size: '250g',
    inStock: true,
    featured: false,
    bestSeller: true,
    labelColor: '#fef9c3',
    accentColor: '#fef08a'
  },
  {
    id: '14',
    slug: 'brahmi-oil',
    name: 'Brahmi Hair Oil',
    botanicalName: 'Bacopa monnieri',
    category: 'ayurvedic-products',
    price: 26.99,
    rating: 4.8,
    reviews: 167,
    description: 'Our traditional Brahmi Oil is prepared following ancient Ayurvedic methods. Infused with Brahmi herb in a base of pure coconut oil, this formulation promotes healthy hair growth and mental clarity.',
    benefits: ['Promotes hair growth', 'Reduces hair fall', 'Calms the mind', 'Improves memory'],
    uses: ['Massage into scalp', 'Leave overnight for deep treatment', 'Use before meditation', 'Regular hair oiling'],
    ingredients: 'Bacopa monnieri extract in Cocos nucifera (Coconut) Oil',
    size: '100ml',
    inStock: true,
    featured: true,
    bestSeller: false,
    labelColor: '#86efac',
    accentColor: '#4ade80'
  },
  {
    id: '15',
    slug: 'ylang-ylang-essential-oil',
    name: 'Ylang Ylang Essential Oil',
    botanicalName: 'Cananga odorata',
    category: 'essential-oils',
    price: 28.99,
    rating: 4.7,
    reviews: 134,
    description: 'Our exotic Ylang Ylang Essential Oil is steam-distilled from fresh Cananga flowers. This oil features a rich, sweet floral aroma with fruity undertones that promotes relaxation and romance.',
    benefits: ['Natural aphrodisiac', 'Reduces stress and anxiety', 'Balances oil production', 'Promotes healthy hair'],
    uses: ['Add to romantic diffuser blends', 'Use in hair care', 'Create natural perfumes', 'Add to massage oils'],
    ingredients: '100% Pure Cananga odorata (Ylang Ylang) Oil',
    size: '15ml',
    inStock: true,
    featured: false,
    bestSeller: false,
    labelColor: '#fde047',
    accentColor: '#facc15'
  },
  {
    id: '16',
    slug: 'coconut-carrier-oil',
    name: 'Fractionated Coconut Oil',
    botanicalName: 'Cocos nucifera',
    category: 'carrier-oils',
    price: 16.99,
    rating: 4.9,
    reviews: 289,
    description: 'Our Fractionated Coconut Oil remains liquid at all temperatures, making it perfect as a carrier oil. This lightweight, odorless oil absorbs quickly and never leaves a greasy residue.',
    benefits: ['Stays liquid always', 'Lightweight and non-greasy', 'Extends shelf life of blends', 'Suitable for all skin types'],
    uses: ['Perfect carrier for essential oils', 'Use for massage', 'Add to DIY products', 'Apply as light moisturizer'],
    ingredients: '100% Pure Fractionated Cocos nucifera (Coconut) Oil',
    size: '100ml',
    inStock: true,
    featured: false,
    bestSeller: true,
    labelColor: '#f0fdf4',
    accentColor: '#dcfce7'
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter(p => p.category === categorySlug);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured);
};

export const getBestSellers = (): Product[] => {
  return products.filter(p => p.bestSeller);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(c => c.slug === slug);
};
