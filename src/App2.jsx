import ExampleLayout from "./ExampleLayout";
import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DrawingApp from "./DrawingApp";
import ModalComponent from "./ModalComponent";
import CalculatingCoordinates from "./CalculatingCoordinates";

const terrainMarkedMap = "terrainMarkedMap.png";
const terrainMarkedMapAfter = "terrainMarkedMapAfter.png";
const markedMap = "markedMap.png";
const markedMapAfter = "markedMapAfter.png";

const App2 = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalShowDraw, setModalShowDraw] = useState(false);
  const [image, setImage] = useState(markedMap);
  const [creatingRectangle, setCreatingRectangle] = useState(false);
  const [rectangles, setRectangles] = useState([]);
  const sections = ["Občerstvenie", "Remeselníctvo", "Spotrebný tovar", "Voľné vystúpenie"];
  const [addSectionText, setAddSectionText] = useState("Pridat sekciu");
  let moveableRef = useRef(null);
  const [target, setTarget] = useState(null);

  useEffect(() => {
    moveableRef.current = null;
  }, [addSectionText]);

  const handleSetImage = () => {
    if (image === markedMap) {
      setImage(terrainMarkedMap);
    } else if (image === terrainMarkedMap) {
      setImage(markedMap);
    } else if (image == markedMapAfter) {
      setImage(terrainMarkedMapAfter);
    } else {
      setImage(markedMapAfter);
    }
  };

  const changeRectangleType = () => {
    const rectangle = target;
    const isGrid = rectangle.classList.toggle("grid-active"); // Toggle grid state

    if (isGrid) {
      rectangle.style.display = "grid";
      rectangle.style.gridTemplateColumns = "repeat(2, 1fr)";
      rectangle.style.gridTemplateRows = "1fr";

      for (let i = 0; i < 24; i++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.style.border = "1px solid gray";
        rectangle.appendChild(cell);
      }
    } else {
      rectangle.style.display = "";
      rectangle.innerHTML = "";
    }
  };

  // Function to add a new rectangle on mouse click
  const handleAddRectangle = (section) => {
    setModalShowDraw(false);
    let drawCircle = section === "Voľné vystúpenie";
    setAddSectionText("Potvrdit sekciu");

    if (creatingRectangle) return;

    const newRectangle = {
      id: Date.now(), // Unique ID for each rectangle
      left: window.innerWidth / 2, // Positioning based on the click point
      top: window.innerHeight / 2,
      width: 100,
      height: 60,
      rotate: 0, // Initialize rotation to 0
      borderRadius: drawCircle ? "50%" : "0%", // Circular shape
      color:
        section === "Občerstvenie"
          ? "f6ff00"
          : section === "Remeselníctvo"
          ? "fd0101"
          : section === "Spotrebný tovar"
          ? "66ea45"
          : "",
    };

    setRectangles([...rectangles, newRectangle]); // Update state with new rectangle
    setCreatingRectangle(true); // Set flag to indicate rectangle creation
  };

  return (
    <>
      <div className="relative flex items-center justify-center" onClick={() => setModalShow(true)}>
        <img src={image} alt="mapa" className="w-full object-cover z-0" />
      </div>

      <ModalComponent
        show={modalShow}
        onHide={() => setModalShow(false)}
        image={image}
        handleSetImage={setImage}
        terrainMarkedMap={terrainMarkedMap}
        terrainMarkedMapAfter={terrainMarkedMapAfter}
        markedMapAfter={markedMapAfter}
      >
        <div className="flex flex-col items-center px-4">
          <ExampleLayout
            existingStalls={[
              {
                id: 1,
                width: 260, // Nový stánok začína na minimálnej šírke
                name: `Stánok 1`,
                singleStallColor: "bg-gray-500",
                isOccupied: true,
              },
            ]}
            stallColor={"bg-yellow-200"}
            adminRights={false}
          />
        </div>
      </ModalComponent>

      <ModalComponent
        show={modalShowDraw}
        onHide={() => setModalShowDraw(false)}
        image={image}
        handleSetImage={setImage}
        terrainMarkedMap={terrainMarkedMap}
        terrainMarkedMapAfter={terrainMarkedMapAfter}
        markedMapAfter={markedMapAfter}
        size="md"
        title="Pridanie sekcie"
      >
        <div className="flex flex-wrap flex-col justify-center ">
          <p>Tu môžete pridať sekciu podľa svojej preferencie.</p>
          {sections.map((section) => (
            <button
              key={section}
              className={`mb-2 rounded relative flex items-center justify-center px-5 py-2.5 text-md font-medium tracking-wide uppercase rounded-lg 
                transition-all duration-200 ease-out transform hover:scale-[1.02] active:scale-[0.98] shadow-sm
                ${
                  section === "Občerstvenie"
                    ? "bg-yellow-300 text-black hover:bg-yellow-200"
                    : section === "Remeselníctvo"
                    ? "bg-red-600 text-white hover:bg-red-500"
                    : section === "Spotrebný tovar"
                    ? "bg-green-400 text-black hover:bg-green-300"
                    : "bg-red-800 text-white hover:bg-red-700"
                }
                before:absolute before:inset-0 before:rounded-lg before:bg-white/5 before:transition-opacity
                hover:before:opacity-100 before:opacity-0 before:duration-200`}
              onClick={() => handleAddRectangle(section)}
            >
              <div className="relative z-10">{section}</div>
            </button>
          ))}
        </div>
      </ModalComponent>

      <DrawingApp
        rectangles={rectangles}
        setRectangles={setRectangles}
        moveableRef={moveableRef}
        target={target}
        setTarget={setTarget}
      />

      <div className="absolute top-10 flex-col right-10 flex justify-center mt-4 bg-white p-4 rounded shadow-lg max-w-sm">
        <span className="text-xl font-bold mb-2">Akcie</span>
        <p className="text-sm text-gray-600">Tu môžete pridať nové sekcie alebo zmeniť pohľad na mapu.</p>
        <button
          onClick={handleSetImage}
          className="rounded my-2 bg-[#B20308] hover:bg-[#925052] text-white font-semibold py-2.5 px-5 rounded-lg 
                    shadow-sm hover:shadow-md transform hover:-translate-y-0.5 
                    transition-all duration-200 ease-in-out active:translate-y-0 active:shadow-sm"
        >
          Zmeniť pohľad
        </button>
        <button
          onClick={() => {
            if (addSectionText === "Pridat sekciu") {
              setModalShowDraw(true);
            } else if (addSectionText === "Potvrdit sekciu") {
              setCreatingRectangle(false);
              setTarget(null);
              setAddSectionText("Pridat sekciu");
            }
          }}
          className="rounded bg-[#B20308] hover:bg-[#925052] text-white font-semibold py-2.5 px-5 rounded-lg 
                    shadow-sm hover:shadow-md transform hover:-translate-y-0.5 
                    transition-all duration-200 ease-in-out active:translate-y-0 active:shadow-sm"
        >
          {addSectionText}
        </button>
      </div>

      {target && (
        <div className="absolute top-10 flex-col left-10 flex justify-center mt-4 bg-white p-4 rounded shadow-lg max-w-sm">
          <button
            className={`mb-2 rounded relative flex items-center justify-center px-5 py-2.5 text-md font-medium tracking-wide uppercase rounded-lg 
                transition-all duration-200 ease-out transform hover:scale-[1.02] active:scale-[0.98] shadow-sm
                bg-red-800 text-white hover:bg-red-700
                before:absolute before:inset-0 before:rounded-lg before:bg-white/5 before:transition-opacity
                hover:before:opacity-100 before:opacity-0 before:duration-200`}
            onClick={changeRectangleType}
          >
            <div className="relative z-10">Mestske stanky</div>
          </button>
          <button
            className={`mb-2 rounded relative flex items-center justify-center px-5 py-2.5 text-md font-medium tracking-wide uppercase rounded-lg 
                transition-all duration-200 ease-out transform hover:scale-[1.02] active:scale-[0.98] shadow-sm
                bg-red-800 text-white hover:bg-red-700
                before:absolute before:inset-0 before:rounded-lg before:bg-white/5 before:transition-opacity
                hover:before:opacity-100 before:opacity-0 before:duration-200`}
            onClick={changeRectangleType}
          >
            <div className="relative z-10">Stanky jarmocanov</div>
          </button>
        </div>
      )}

      {target && (
        <div className="sticky w-60 h-20 bottom-10 left-10">
          <CalculatingCoordinates target={target} />
        </div>
      )}

      <div className="absolute flex bottom-10 right-10 bg-white rounded-lg shadow-lg p-4 w-sm flex-col">
        <span className="text-md font-bold mb-2">Legenda</span>
        <div className="flex items-center h-32">
          <img src="legenda.png" alt="legenda" className="" />
        </div>
      </div>
    </>
  );
};

export default App2;
