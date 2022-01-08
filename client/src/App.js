import logo from './logo.svg';
import './App.css';
import { Form, FormControl } from "react-bootstrap";
import React, { useState, useRef } from "react";
import ResultModal from './components/ResultModal';
import fetchAPI from './helpers/FetchApi';

function App() {
  const preferences = useRef("")
  const [locationList, setLocationList] = useState([])
  const [resultModalShow, setResultModalShow] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    let nameList = []
    let locationResponse = await fetchAPI(preferences.current.value)

    console.log(locationResponse[0])

    nameList.push(locationResponse[0]['name'])
    nameList.push(locationResponse[1]['name'])
    nameList.push(locationResponse[2]['name'])
    
    setLocationList(nameList)
    setResultModalShow(true)
  }

  const handleClose = async(e) => {
    e.preventDefault()
    setResultModalShow(false)
    setLocationList([])
  }

  return (
    <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Enter your preference here:
          </p>
          <Form onSubmit={handleSubmit}>
            <FormControl
              type="text"
              name="search"
              className="mr-sm-2"
              style={{ marginBottom: 10, marginRight: 10, width: 500 }}
              ref={preferences}
            />
          </Form>
        </header>
        <ResultModal
          show={resultModalShow}
          onHide={handleClose}
          locationList={locationList}
        />
    </div>
  );
}

export default App;