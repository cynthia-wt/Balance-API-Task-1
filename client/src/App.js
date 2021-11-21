import logo from './logo.svg';
import './App.css';
import { Form, FormControl } from "react-bootstrap";
import React, { useState, useRef } from "react";
import UserBalanceModal from './components/UserBalanceModal';
import ErrorMessageModal from './components/ErrorMessageModal';
import fetchAPI from './helpers/FetchAPI';

function App() {
  const userId = useRef("");
  const [balanceModalShow, setBalanceModalShow] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);
  const [btcBalance, setBtcBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);
  const [errorModalShow, setErrorModalShow] = useState(false);

  const resetValues = async () => {
    setTotalBalance(0);
    setBtcBalance(0);
    setEthBalance(0);
  }

  const handleClose = async (e) => {
    e.preventDefault();
    setBalanceModalShow(false);
    resetValues();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let totalBalanceResponse = await fetchAPI(`${userId.current.value}/total-balance`);
    let userBalancesResponse = await fetchAPI(`${userId.current.value}/balances`);

    if (totalBalanceResponse === undefined || userBalancesResponse === undefined) {
      setErrorModalShow(true);

    } else {
      setTotalBalance(totalBalanceResponse[userId.current.value]);

      if (userBalancesResponse["BTC"] !== undefined) {
        setBtcBalance(userBalancesResponse["BTC"]);
      }
      if (userBalancesResponse["ETH"] !== undefined) {
        setEthBalance(userBalancesResponse["ETH"]);
      }
      setBalanceModalShow(true);
    }
  };

  return (
    <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Enter User ID here to calculate total balance:
          </p>
          <Form onSubmit={handleSubmit}>
            <FormControl
              type="text"
              name="search"
              className="mr-sm-2"
              style={{ marginBottom: 10, marginRight: 10, width: 500 }}
              ref={userId}
            />
          </Form>
        </header>
        <UserBalanceModal
          show={balanceModalShow}
          onHide={handleClose}
          userid={userId.current.value}
          totalbalance={totalBalance}
          btcbalance={btcBalance}
          ethbalance={ethBalance}
        />
        <ErrorMessageModal
          show={errorModalShow}
          onHide={() => setErrorModalShow(false)}
        />
    </div>
  );
}

export default App;