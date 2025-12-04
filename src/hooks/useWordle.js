import { useState, useCallback } from "react";
import { CONFIG, SCORE } from "../utils/config";

import * as yup from "yup";

const apiResponseSchema = yup.object({
  isvalidword: yup.boolean().required(),
  score: yup
    .array()
    .ensure()
    .when("isvalidword", {
      is: true,
      then: (schema) =>
        schema
          .length(5)
          .of(yup.number().oneOf([0, 1, 2]))
          .required(),
      otherwise: (schema) => schema.length(0).required(),
    }),
});

export const useWordle = () => {
  // State
  const [pastGuesses, setPastGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Computed
  const isGameWon =
    pastGuesses.length > 0 &&
    pastGuesses[pastGuesses.length - 1].score.every((s) => s === SCORE.CORRECT);

  const isGameLost = !isGameWon && pastGuesses.length >= CONFIG.MAX_GUESSES;
  const isGameOver = isGameWon || isGameLost;

  // Actions
  const resetGame = useCallback(() => {
    setPastGuesses([]);
    setCurrentGuess("");
    setIsLoading(false);
    setFeedback("");
  }, []);

  const submitGuess = useCallback(async () => {
    // console.log("submit");
    if (isLoading || isGameOver) return;

    if (currentGuess.length !== CONFIG.WORD_LENGTH) {
      setFeedback("Use a 5-letter word!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(CONFIG.API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guess: currentGuess }),
        signal: AbortSignal.timeout(5000)
      });

      if (!response.ok) throw new Error(`Server returned ${response.status}`);

      const rawData = await response.json();

      // defensive checks
      let data;
      try {
        // validateSync throws an error if validation fails
        // stripUnknown: true removes any extra fields the API might send
        data = apiResponseSchema.validateSync(rawData, { stripUnknown: true });
      } catch (validationError) {
        console.error("Validation Failed:", validationError.errors);
        throw new Error("Invalid data received from server");
      }
      // defensive checks end

      if (!data.isvalidword) {
        setFeedback("This is not a valid word!");
        return;
      }

      const newTurns = [
        ...pastGuesses,
        { guess: currentGuess, score: data.score },
      ];
      setPastGuesses(newTurns);
      setCurrentGuess("");
      setFeedback("");
    } catch (error) {
      setFeedback("Server Error");
      console.error("Game Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentGuess, isLoading, isGameOver, pastGuesses]);

  const handleInput = useCallback(
    (key) => {
      if (isGameOver || isLoading) return;

      const upperKey = key.toUpperCase();

      if (upperKey === "ENTER") {
        submitGuess();
      } else if (upperKey === "BACKSPACE") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (
        /^[a-zA-Z]$/.test(key) &&
        currentGuess.length < CONFIG.WORD_LENGTH
      ) {
        setCurrentGuess((prev) => prev + key);
      }
    },
    [currentGuess, isGameOver, isLoading, submitGuess]
  );

  return {
    pastGuesses,
    currentGuess,
    feedback,
    isGameWon,
    isGameOver,
    isLoading,
    handleInput,
    resetGame,
  };
};
