import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
export { app };

async function fetchLocation(search) {
  const apiKey = 'AIzaSyAKX4F7_tY1rEy83CTT-szwHEcABvkRPHo'
  const input = encodeURIComponent(search)
  const inputType = 'textquery'
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?input=${input}&inputtype=${inputType}&key=${apiKey}`
  
  const options = {
      'method': 'GET',
      'headers': {
          'Content-Type': 'application/json'
      }
  }

  const result = await fetch(url, options)
      .then(res => res.json())
      .catch((error) => {
          console.log("Failed to fetch location data from Google Map")
          throw new error("Failed to fetch location data")
      })  

  return result.results.slice(0,3)
}

app.get('/locations/:search', cors(), async (req, res) => {
  const search = req.params.search
  const searchResult = await fetchLocation(search)
  res.status(200).send(searchResult)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(8080, () => {
  console.log(`Example app listening at http://localhost:8080`)
})