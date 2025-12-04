import { GameProvider } from "./contexts/GameContext";
import GameContainer from "./layouts/GameContainer";
import "./index.css";

export default function App() {
  return (
    <GameProvider>
      <GameContainer />
    </GameProvider>
  );
}
