import { useState } from "react";
import { ResizableBox } from "react-resizable";
import { FaCheck } from "react-icons/fa";
import "react-resizable/css/styles.css";

const ResizableMarket = ({ existingStalls, stallColor, adminRights }) => {
  const containerWidth = 1000;
  const baseMeterPerPixel = 0.04;
  const minStallWidth = 100;
  const maxStallWidth = 260;

  const [stallAdded, setStallAdded] = useState(false);
  const [text, setText] = useState("Pridať stánok");
  const [stalls, setStalls] = useState(existingStalls);
  const [remainingWidth, setRemainingWidth] = useState(containerWidth);

  const handleAddStall = () => {
    if (!adminRights) {
      if (text === "Pridať stánok") {
        setText("Potvrdiť stánok");
      }
      if (text === "Potvrdiť stánok") {
        setStallAdded(true);
        setText("Stánok bol zarezervovaný");
        return;
      }
    }

    if (remainingWidth >= minStallWidth) {
      const newStall = {
        id: stalls.length + 1,
        width: minStallWidth,
        name: `Stánok ${stalls.length + 1}`,
        singleStallColor: "bg-green-500",
      };

      setStalls([...stalls, newStall]);
      setRemainingWidth(remainingWidth - minStallWidth);
    }
  };

  const handleResizeStop = (index, newWidth) => {
    const updatedStalls = [...stalls];
    const prevWidth = updatedStalls[index].width;
    const widthDiff = newWidth - prevWidth;

    if (remainingWidth - widthDiff >= 0) {
      updatedStalls[index].width = newWidth;
      setStalls(updatedStalls);
      setRemainingWidth(remainingWidth - widthDiff);
    }
  };

  const handleManualWidthChange = (index, event) => {
    let newWidth = parseInt(event.target.value, 10);
    if (isNaN(newWidth)) return;
    if (newWidth < minStallWidth) newWidth = minStallWidth;
    if (newWidth > maxStallWidth) newWidth = maxStallWidth;

    const updatedStalls = [...stalls];
    updatedStalls[index].width = newWidth;
    setStalls(updatedStalls);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-4">
        {stallAdded ? (
          <div className="flex items-center gap-2 text-green-500 font-bold">
            <FaCheck /> {text}
          </div>
        ) : (
          <button
            onClick={handleAddStall}
            disabled={remainingWidth < minStallWidth}
            className="px-4 py-2 bg-green-500 text-white font-bold rounded disabled:bg-gray-400"
          >
            {text}
          </button>
        )}
      </div>

      <div className={`border border-gray-500 w-[800px] h-[160px] flex items-center p-2 ${stallColor}`}>
        <div className="flex items-center relative">
          {stalls.map((stall, index) => (
            <div key={stall.id} className="relative">
              <div className="flex flex-row">
                <ResizableBox
                  width={stall.width}
                  height={104}
                  disabled={stallAdded}
                  minConstraints={[minStallWidth, 104]}
                  maxConstraints={[maxStallWidth, 104]}
                  axis="x"
                  onResizeStop={(e, data) => handleResizeStop(index, data.size.width)}
                  className={`${stall.singleStallColor} text-white flex items-center justify-center font-bold text-sm px-4 relative`}
                >
                  <div className="flex flex-col items-center gap-2">
                    {stall.name} ({Math.round(stall.width * baseMeterPerPixel)} m)
                    {stall.isOccupied && (
                      <button className="relative group bg-red-500 text-white p-1 rounded">
                        Zapísať sa do poradovníka
                      </button>
                    )}
                  </div>
                </ResizableBox>
                <div className="bg-blue-200 top-0 left-0 w-6 h-26 z-10"> </div>
              </div>
              <input
                type="text"
                value={Math.round(stall.width / 26)}
                onChange={(event) => handleManualWidthChange(index, event)}
                className="mt-1 w-full text-center font-bold border border-yellow-600 border-2 rounded p-1 text-sm bg-yellow-100"
              />
            </div>
          ))}
        </div>
      </div>

      <p className="mt-2 text-gray-700">
        Zostávajúca plocha: <span className="font-bold">{Math.round(remainingWidth * baseMeterPerPixel)} m</span>
      </p>
      <p className="mt-2 text-gray-700">
        Suma na deň: <span className="font-bold">{Math.round(stalls[1]?.width / 15)} €</span>
      </p>
      <p className="mt-2 text-gray-700">
        Vzdialenosť od elektrického zdroja: <span className="font-bold">12 m</span>
      </p>
      <p className="mt-2 text-gray-700">
        Vzdialenosť od vodného zdroja: <span className="font-bold">10 m</span>
      </p>
    </div>
  );
};

export default ResizableMarket;
