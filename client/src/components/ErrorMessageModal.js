import { React } from "react";
import { Modal, Button } from "react-bootstrap";

function ErrorMessageModal(props) {

    return (
        <Modal style={{ opacity: 1, marginTop: 400, paddingTop: 30 }}
            backdrop="static"
            keyboard={false}
            {...props}
        >
            <Modal.Header>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>An error has occured.</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="danger" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ErrorMessageModal;
