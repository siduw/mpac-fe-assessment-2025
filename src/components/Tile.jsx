import { SCORE } from "../utils/config";

const Tile = ({ letter, score, isCurrent }) => {
  const baseClass =
    "w-14 h-14 border-2 flex items-center justify-center text-3xl font-bold uppercase select-none transition-colors duration-300";

  let stateClass = "bg-white border-gray-300 text-black";

  if (isCurrent) {
    stateClass = "bg-white border-gray-800 text-black";
  } else if (score === SCORE.CORRECT) {
    stateClass = "bg-green-600 border-green-600 text-white";
  } else if (score === SCORE.PRESENT) {
    stateClass = "bg-yellow-500 border-yellow-500 text-white";
  } else if (score === SCORE.MISS) {
    stateClass = "bg-gray-500 border-gray-500 text-white";
  }

  const animateClass = isCurrent && letter ? "animate-bounce-short" : "";

  return (
    <div className={`${baseClass} ${stateClass} ${animateClass}`}>{letter}</div>
  );
};

export default Tile;
