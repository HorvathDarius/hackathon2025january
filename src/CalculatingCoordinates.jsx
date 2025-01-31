import { useEffect, useState } from "react";

const CalculatingCoordinates = ({ target }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!target) return;

    const updateDimensions = () => {
      setDimensions({
        width: Math.floor(target.offsetWidth * 0.3),
        height: Math.floor(target.offsetHeight * 0.3),
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    updateDimensions();
    resizeObserver.observe(target);

    return () => {
      resizeObserver.disconnect();
    };
  }, [target]);

  return (
    <div className="bg-white w-full h-30 p-3 font-bold rounded shadow gap-4">
      <p className="text-sm">Miesto pre stálky</p>
      <p className="text-md p-0 m-0">Dĺžka: {dimensions.width} m</p>
      <p className="text-md p-0 m-0">Šírka: {dimensions.height}m</p>
    </div>
  );
};

export default CalculatingCoordinates;
