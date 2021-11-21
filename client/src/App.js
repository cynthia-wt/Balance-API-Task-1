import logo from './logo.svg';
import './App.css';
import { Form, FormControl } from "react-bootstrap";
import React, { useState, useRef } from "react";
import UserBalanceModal from './UserBalanceModal';

function App() {
  const userId = useRef("");
  const [balanceModalShow, setBalanceModalShow] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);
  const [btcBalance, setBtcBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);

  const resetValues = async (e) => {
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
    setBalanceModalShow(true);

    let totalBalanceResponse = await fetch(
      `http://localhost:8080/users/${userId.current.value}/total-balance`
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
    
    setTotalBalance(totalBalanceResponse[userId.current.value]);  

    let userBalances = await fetch(
      `http://localhost:8080/users/${userId.current.value}/balances`
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
    
    if (userBalances["BTC"] != undefined) {
      setBtcBalance(userBalances["BTC"]);
    } 

    if (userBalances["ETH"] != undefined) {
      setEthBalance(userBalances["ETH"]);
    }
  };

  return (
    <div className="App">
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Enter user id here to calculate total balance:
          </p>
          <>
            <Form onSubmit={handleSubmit}>
              <FormControl
                type="text"
                name="search"
                className="mr-sm-2"
                style={{ marginBottom: 10, marginRight: 10, width: 500 }}
                ref={userId}
              />
            </Form>

          </>
        </header>
        <UserBalanceModal
          show={balanceModalShow}
          onHide={handleClose}
          userId={userId.current.value}
          totalBalance={totalBalance}
          btcBalance={btcBalance}
          ethBalance={ethBalance}
        />
      </div>
    </div>
  );
}

export default App;
