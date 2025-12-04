import { GameContext } from "../contexts/GameContext";
import { useWordle } from "../hooks/useWordle";

export const GameProvider = ({ children }) => {
  const gameLogic = useWordle();

  return (
    <GameContext.Provider value={gameLogic}>{children}</GameContext.Provider>
  );
};
