import { React } from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";

function ResultModal(props) {

    return (
        <Modal style={{ opacity: 1, marginTop: 400, paddingTop: 50 }}
            backdrop="static"
            keyboard={false}
            {...props}
        >
            <Modal.Header>
                <Modal.Title>Let's ketchup at these places</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <ListGroup>
                    <ListGroup.Item>{props.locationList[0]}</ListGroup.Item>
                    <ListGroup.Item>{props.locationList[1]}</ListGroup.Item>
                    <ListGroup.Item>{props.locationList[2]}</ListGroup.Item>
                </ListGroup>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="danger" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ResultModal;