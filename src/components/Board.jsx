import { CONFIG } from "../utils/config";
import Row from "./Row";

const Board = () => {
  return (
    <div className="grid gap-1.5 p-2" role="grid" aria-label="Game Grid">
      {Array.from({ length: CONFIG.MAX_GUESSES }).map((_, rowIndex) => (
        <Row key={rowIndex} rowIndex={rowIndex} />
      ))}
    </div>
  );
};

export default Board;
