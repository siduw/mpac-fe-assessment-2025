import { useGame } from "../contexts/GameContext";

const Header = () => {
  const { isGameWon, isGameOver, resetGame } = useGame();

  return (
    <header className="flex items-center justify-between w-full max-w-lg p-4 border-b border-gray-200 bg-white shadow-sm rounded-2xl mt-4">
      <div className="flex items-baseline gap-3">
        <h1 className="text-3xl font-extrabold tracking-wider">WORDLE</h1>
        {isGameWon && (
          <span className="text-xl font-bold text-green-600 animate-bounce-short">
            WIN - reset to play again
          </span>
        )}
        {isGameOver && !isGameWon && (
          <span className="text-xl font-bold text-red-600 animate-pulse">
            LOST - reset to play again
          </span>
        )}
      </div>

      <button
        onClick={resetGame}
        onMouseDown={(e) => e.preventDefault()} // to prevent focus on button
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-full border"
        title="Restart Game"
        aria-label="Restart Game"
      >
        RESET
      </button>
    </header>
  );
};

export default Header;
