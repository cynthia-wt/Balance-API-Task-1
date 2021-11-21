import { React } from "react";
import { Modal, Button } from "react-bootstrap";

function UserBalanceModal(props) {

    return (
        <Modal style={{ opacity: 1, marginTop: 400, paddingTop: 30 }}
            backdrop="static"
            keyboard={false}
            {...props}
        >
            <Modal.Header>
                <Modal.Title>Balances for User ID {props.userId}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>BTC Balance - {props.btcBalance}</p>
                <p>ETH Balance - {props.ethBalance}</p>
                <p>Total Balance in USD - {props.totalBalance}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="danger" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default UserBalanceModal;
