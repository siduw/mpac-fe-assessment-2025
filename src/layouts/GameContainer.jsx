import { useEffect } from "react";
import { useGame } from "../contexts/GameContext";

import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import Board from "../components/Board";

const GameContainer = () => {
  const { handleInput } = useGame();

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      // only accept valid keys; ignore rest
      if (
        /^[a-zA-Z]$/.test(key) ||
        key === "Enter" ||
        key === "Backspace"
      ) {
        handleInput(key);
      } else {
        return;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleInput]);

  return (
    <div className="bg flex flex-col items-center min-h-screen bg-gray-50 font-sans text-gray-900">
      <Header />
      <InfoCard />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <Board />
      </main>
    </div>
  );
};

export default GameContainer;
