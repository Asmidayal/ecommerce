import { GoogleGenAI } from '@google/genai';
import handleAsyncErrors from '../middlewares/handleAsyncErrors.js';
import handleError from '../utils/handleError.js';
import {
  parseBeautyIntent,
  fetchCandidateProducts,
  formatProductsForLLM,
} from '../utils/beautyHelper.js';

function formatProduct(p) {
  return {
    _id: p._id,
    name: p.name,
    price: p.price,
    category: p.category,
    ratings: p.ratings,
    image: p.image,
  };
}

function safeParseJSON(text) {
  const cleaned = text
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim();

  return JSON.parse(cleaned);
}

export const beautyHelperChat = handleAsyncErrors(async (req, res, next) => {
  const { message } = req.body;

  if (!message?.trim()) {
    return next(new handleError('Please enter a message', 400));
  }

  if (!process.env.GEMINI_API_KEY) {
    return next(new handleError('Gemini API key is missing', 500));
  }

  const intent = parseBeautyIntent(message);
  const candidates = await fetchCandidateProducts(intent);

  if (!candidates.length) {
    return res.status(200).json({
      success: true,
      reply:
        "I couldn't find matching products right now. Try asking for Lips, Eyes, Face, or Nails products.",
      products: [],
    });
  }

  const catalog = formatProductsForLLM(candidates);

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = `
You are LeaBeauty's beauty shopping assistant.

Rules:
- Recommend ONLY products from the catalog JSON below.
- Never invent products.
- Pick 1 to 3 best products.
- Explain why each fits the user's request.
- Mention price in INR.
- Works for all categories: Lips, Eyes, Face, Nails.

Return ONLY valid JSON in this exact format:
{
  "reply": "friendly message",
  "recommendedProductIds": ["id1", "id2"]
}

User message: ${message}

Detected intent: ${JSON.stringify(intent)}

Product catalog:
${JSON.stringify(catalog)}
`;

  const result = await ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: prompt,
    config: {
      temperature: 0.4,
      responseMimeType: 'application/json',
    },
  });

  const rawText = result.text;

  let parsed;
  try {
    parsed = safeParseJSON(rawText);
  } catch {
    const fallback = candidates.slice(0, 2);
    return res.status(200).json({
      success: true,
      reply: `Here are my suggestions: ${fallback.map((p) => p.name).join(' and ')}.`,
      products: fallback.map(formatProduct),
    });
  }

  const idSet = new Set(parsed.recommendedProductIds || []);
  let recommendedProducts = candidates
    .filter((p) => idSet.has(p._id.toString()))
    .map(formatProduct);

  if (!recommendedProducts.length) {
    recommendedProducts = candidates.slice(0, 2).map(formatProduct);
  }

  res.status(200).json({
    success: true,
    reply:
      parsed.reply ||
      `Here are my suggestions: ${recommendedProducts.map((p) => p.name).join(', ')}.`,
    products: recommendedProducts,
  });
});