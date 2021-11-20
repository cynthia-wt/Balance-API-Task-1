import logo from './logo.svg';
import './App.css';
import { Form, FormControl } from "react-bootstrap";
import React, { useState } from "react";

function App() {
  const userId = React.useRef("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("user id : " + userId.current.value);

    let totalBalance = await fetch(
      `http://localhost:8080/users/${userId.current.value}/total-balance`
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));

    const totalBalanceValue = totalBalance[userId.current.value];
    console.log("total balance : " + totalBalanceValue);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Enter user id here to calculate total balance:
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
    </div>
  );
}

export default App;
