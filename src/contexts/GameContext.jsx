import { createContext, useContext } from "react";
import { useWordle } from "../hooks/useWordle";

const GameContext = createContext(null);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const gameLogic = useWordle();

  return (
    <GameContext.Provider value={gameLogic}>{children}</GameContext.Provider>
  );
};
