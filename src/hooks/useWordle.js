import { useState, useCallback, useMemo, useRef } from "react";
import { CONFIG, SCORE } from "../utils/config";

export const useWordle = () => {
  // State
  const [pastGuesses, setPastGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Computed
  const isGameWon = useMemo(() => {
    if (pastGuesses.length === 0) return false;
    return pastGuesses[pastGuesses.length - 1].score.every(
      (s) => s === SCORE.CORRECT
    );
  }, [pastGuesses]);

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
      });

      if (!response.ok) throw new Error(`Server returned ${response.status}`);

      const data = await response.json();

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
      } else if (upperKey === "BACK" || upperKey === "BACKSPACE") {
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
