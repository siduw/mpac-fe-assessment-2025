export const CONFIG = Object.freeze({
  MAX_GUESSES: 6,
  WORD_LENGTH: 5,
  API_URL: "https://wordle-apis.vercel.app/api/validate",
});

export const SCORE = Object.freeze({
  MISS: 0,
  PRESENT: 1,
  CORRECT: 2,
});
