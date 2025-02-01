import Moveable from "react-moveable";

const DrawStaticRectangle = ({ rectangles, moveableRef, target, setTarget }) => {
  // Handle mouse down to start dragging or resizing
  const onMouseDown = (e) => {
    const nativeEvent = e.nativeEvent;
    setTarget(nativeEvent.target); // Set target element for Moveable
  };

  // Function to handle drag, resize, and rotate updates
  const handleTransform = (e) => {
    if (target) {
      target.style.left = `${e.left}px`;
      target.style.top = `${e.top}px`;
      target.style.width = `${e.width}px`; // Update width during resize
      target.style.height = `${e.height}px`; // Update height during resize
      target.style.transform = `rotate(${e.rotate}deg)`; // Update rotation
    }
  };

  return (
    <div>
      {rectangles &&
        rectangles.map((rect) => (
          <div
            key={rect.id}
            onMouseDown={onMouseDown}
            style={{
              position: "absolute",
              left: `${rect.left}px`,
              top: `${rect.top}px`,
              width: `${rect.width}px`,
              height: `${rect.height}px`,
              backgroundColor: `#${rect.color}66`,
              border: "1px solid black",
              cursor: "move",
              transform: `rotate(${rect.rotate}deg)`, // Set initial rotation
              transformOrigin: "center", // Set rotation origin to the center
              borderRadius: rect.borderRadius,
            }}
          />
        ))}
      <Moveable
        ref={moveableRef}
        target={target} // Set target dynamically for drag, resize, or rotate
        draggable={true} // Enable dragging
        rotatable={true} // Enable rotating
        onDrag={(e) => {
          handleTransform(e); // Handle drag updates
        }}
        onResize={(e) => {
          handleTransform(e); // Handle resize updates
        }}
        onRotate={(e) => {
          handleTransform(e); // Handle rotate updates
        }}
      />
    </div>
  );
};

export default DrawStaticRectangle;
