import { Button, Modal } from "react-bootstrap";

function ModalComponent({
  image,
  handleSetImage,
  terrainMarkedMap,
  terrainMarkedMapAfter,
  markedMapAfter,
  children,
  size = "xl",
  title,
  ...props
}) {
  const handleClose = () => {
    if (image === terrainMarkedMap) {
      handleSetImage(terrainMarkedMapAfter);
    } else {
      handleSetImage(markedMapAfter);
    }

    props.onHide();
  };

  return (
    <Modal
      {...props}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

export default ModalComponent;
