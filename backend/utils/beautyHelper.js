import Product from '../models/productModel.js';

const CATEGORY_MAP = {
  // Lips
  lipstick: ['Lips', 'Lipsticks'],
  lip: ['Lips', 'Lipsticks'],
  lips: ['Lips', 'Lipsticks'],
  lipgloss: ['Lips', 'Lipsticks'],
  'lip gloss': ['Lips', 'Lipsticks'],
  'lip balm': ['Lips', 'Lipsticks'],

  // Eyes
  eye: ['Eyes'],
  eyes: ['Eyes'],
  mascara: ['Eyes'],
  eyeliner: ['Eyes'],
  kajal: ['Eyes'],
  eyeshadow: ['Eyes'],
  'eye shadow': ['Eyes'],
  liner: ['Eyes'],

  // Face
  face: ['Face'],
  foundation: ['Face'],
  concealer: ['Face'],
  blush: ['Face'],
  highlighter: ['Face'],
  primer: ['Face'],
  compact: ['Face'],
  powder: ['Face'],

  // Nails
  nail: ['Nails'],
  nails: ['Nails'],
  manicure: ['Nails'],
  polish: ['Nails'],
  'nail polish': ['Nails'],
};

const OCCASION_KEYWORDS = {
  party: ['party', 'night', 'bold', 'glam', 'festive', 'evening'],
  wedding: ['wedding', 'bridal', 'marriage', 'traditional'],
  office: ['office', 'work', 'daily', 'subtle', 'natural', 'professional'],
  casual: ['casual', 'everyday', 'day', 'simple'],
  date: ['date', 'romantic', 'dinner'],
};

export function parseBeautyIntent(message = '') {
  const text = message.toLowerCase();

  let categories = [];
  for (const [word, cats] of Object.entries(CATEGORY_MAP)) {
    if (text.includes(word)) {
      categories.push(...cats);
    }
  }
  categories = [...new Set(categories)];

  let occasion = null;
  for (const [key, words] of Object.entries(OCCASION_KEYWORDS)) {
    if (words.some((w) => text.includes(w))) {
      occasion = key;
      break;
    }
  }

  // detect budget like "under 500" or "below ₹800"
  const priceMatch = text.match(/(?:under|below|less than|upto|up to|max)\s*₹?\s*(\d+)/i);
  const maxPrice = priceMatch ? Number(priceMatch[1]) : null;

  return {
    categories,
    occasion,
    maxPrice,
    rawMessage: message,
  };
}

export async function fetchCandidateProducts({ categories, occasion, maxPrice, limit = 25 }) {
  const query = { stock: { $gt: 0 } };

  if (categories.length > 0) {
    query.category = { $in: categories };
  }

  if (maxPrice) {
    query.price = { $lte: maxPrice };
  }

  let products = await Product.find(query)
    .select('name description price category ratings image stock numOfReviews')
    .limit(limit)
    .lean();

  if (occasion && OCCASION_KEYWORDS[occasion]) {
    const words = OCCASION_KEYWORDS[occasion];

    products = products
      .map((p) => {
        const blob = `${p.name} ${p.description}`.toLowerCase();
        const score = words.reduce((s, w) => (blob.includes(w) ? s + 1 : s), 0);
        return { ...p, _score: score };
      })
      .sort((a, b) => b._score - a._score || b.ratings - a.ratings);
  } else {
    products = products.sort((a, b) => b.ratings - a.ratings);
  }

  return products;
}

export function formatProductsForLLM(products) {
  return products.map((p) => ({
    id: p._id.toString(),
    name: p.name,
    category: p.category,
    price: p.price,
    ratings: p.ratings,
    reviews: p.numOfReviews,
    description: p.description,
    inStock: p.stock > 0,
  }));
}