import { useGame } from "../contexts/GameContext";

const InfoCard = () => {
  const { feedback } = useGame();
  return (
    <div className="w-full max-w-lg mt-4 px-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm text-sm">
      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-gray-800">
          {"Wishing you a Happy New Year and a Merry Christmas :)"}
        </h3>
        <p className="text-gray-600">
          This submission if for MPAC Technical Asessment
        </p>
        <p className="text-gray-600">Made by Siddharth Vagavolu</p>
         <p className="text-gray-600">Use Keys: a-zA-Z, Enter, Backspace</p>
        <p className="text-red-600">{feedback}</p>
      </div>
    </div>
  );
};

export default InfoCard;
