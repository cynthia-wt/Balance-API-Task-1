import { useState, React } from "react";
import { Modal, Button, Table } from "react-bootstrap";

function UserBalanceModal(props) {

    return (
        <Modal style={{ opacity: 1, marginTop: 400, paddingTop: 30 }}
            backdrop="static"
            keyboard={false}
            {...props}
        >
            <Modal.Header>
                <Modal.Title>Balances for User Id {props.userId}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>BTC Balance - {props.btcBalance}</p>
                <p>ETH Balance - {props.ethBalance}</p>
                <p>Total Balance in USD - {props.totalBalance}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default UserBalanceModal;
