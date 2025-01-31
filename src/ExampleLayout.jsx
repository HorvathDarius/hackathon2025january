import { useState } from "react";
import { ResizableBox } from "react-resizable";
import { FaCheck } from "react-icons/fa";
import "react-resizable/css/styles.css";

const ResizableMarket = ({ existingStalls, stallColor, adminRights }) => {
  const containerWidth = 1000; // Šírka celého priestoru v px
  const baseMeterPerPixel = 0.04; // Koeficient na prepočet z px na m² (napr. 10px = 1m²)
  const minStallWidth = 100; // Minimálna šírka stánku v px
  const maxStallWidth = 260; // Maximálna možná šírka pre jeden stánok

  const [stallAdded, setStallAdded] = useState(false);
  const [text, setText] = useState("Pridať stánok");
  const [stalls, setStalls] = useState(existingStalls); // Stánky s informáciami
  const [remainingWidth, setRemainingWidth] = useState(containerWidth); // Zostávajúca šírka pre ďalšie stánky

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
        width: minStallWidth, // Nový stánok začína na minimálnej šírke
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

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-4 ">
        {stallAdded ? (
          <div className="flex items-center gap-2 text-green-500 font-bold">
            <FaCheck icon="fa-solid fa-check" /> {text}
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

      <div className={`border border-gray-500 w-[800px] h-[120px] flex items-center p-2 gap-4  ${stallColor}`}>
        <div className="bg-blue-200 flex items-center gap-4">
          {stalls.map((stall, index) => (
            <ResizableBox
              key={stall.id}
              width={stall.width}
              height={100}
              disabled={stallAdded}
              minConstraints={[minStallWidth, 100]}
              maxConstraints={[maxStallWidth, 100]}
              axis="x"
              onResizeStop={(e, data) => handleResizeStop(index, data.size.width)}
              className={`${stall.singleStallColor} text-white flex items-center justify-center font-bold text-sm px-4`}
            >
              {stall.name} ({Math.round(stall.width * baseMeterPerPixel)} m²)
            </ResizableBox>
          ))}
        </div>
      </div>

      <p className="mt-2 text-gray-700">Zostávajúca plocha: {Math.round(remainingWidth * baseMeterPerPixel)} m</p>
    </div>
  );
};

export default ResizableMarket;
