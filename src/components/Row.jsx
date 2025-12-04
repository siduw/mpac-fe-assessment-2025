import { useGame } from "../contexts/GameContext";
import { CONFIG } from "../utils/config";
import Tile from "./Tile";

const Row = ({ rowIndex }) => {
  const { pastGuesses, currentGuess } = useGame();

  const turn = pastGuesses[rowIndex];
  const isActiveRow = rowIndex === pastGuesses.length;

  const getLetter = (i) => {
    if (turn) return turn.guess[i];
    if (isActiveRow) return currentGuess[i];
    return "";
  };

  return (
    <div className={`grid grid-cols-5 gap-1.5`}>
      {Array.from({ length: CONFIG.WORD_LENGTH }).map((_, colIndex) => (
        <Tile
          key={colIndex}
          letter={getLetter(colIndex)}
          score={turn?.score[colIndex]}
          isCurrent={isActiveRow && colIndex === currentGuess.length}
        />
      ))}
    </div>
  );
};

export default Row;
