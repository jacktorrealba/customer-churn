import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ResultsModal(props) {
    
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Customer Churn Prediction
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6></h6>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }