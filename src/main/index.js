import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
export { app };

const assets = {
  BTC: "btc",
  ETH: "eth"
}

const userBalances = {
  "100001": {
    "BTC": "0.5",
    "ETH": "2"
  },
  "100002": {
    "BTC": "0.1",
    "ETH": "0"
  },
  "100003": {
    "BTC": "0",
    "ETH": "0.7"
  },
  "100004": {
    "BTC": "12",
    "ETH": "3"
  },
  "100005": {
    "BTC": "4",
    "ETH": "3"
  }
};

async function fetchTickerData(baseAsset) {
  const url = `http://www.bitstamp.net/api/v2/ticker/${baseAsset}usd`;
  const options = {
    "method": "GET",
    "headers": {
      "Content-Type": "application/json"
    },
  }

  const tickerData = await fetch(url, options)
    .then(res => res.json())
    .catch((error) => {
      console.error("Failed to fetch ticker data from Bitstamp");
      throw new error("Failed to fetch ticker data from Bitstamp");
    });

  return tickerData;
}

function roundToTwo(num) {
  return + (Math.round(num + "e+2") + "e-2");
}

export async function calculateTotal(assetBalances, btcPrice, ethPrice) {
  console.log("btcPrice : " + btcPrice);
  console.log("ethPrice : " + ethPrice);

  let totalBalance = 0;
  let lastPrice;

  for (const asset in assetBalances) {
    if (Object.values(assets).includes(asset.toLowerCase())) {

      if (asset == "BTC") {
        lastPrice = btcPrice;
      } else {
        lastPrice = ethPrice;
      }

      totalBalance += lastPrice * assetBalances[asset];

    } else {

      // Example of bad asset data in database: "XYZ": "1", where asset XYZ does not exist
      console.error(`Bad data : Asset ${asset} is invalid`);
      throw new error(`Bad data : Asset ${asset} is invalid :`)
    }
  }

  return totalBalance;
}

app.get('/users/:id/total-balance', cors(), async (req, res) => {
  const userId = req.params.id;

  try {
    if (!userBalances[userId]) {
      console.error(`Invalid input : User id ${userId} is not found`);
      res.status(404).send({ "message": `Invalid input - User id ${userId} is not found` });

    } else {
      const btcPrice = (await fetchTickerData("btc")).last;
      const ethPrice = (await fetchTickerData("eth")).last;
      const totalBalance = await (calculateTotal(userBalances[userId], btcPrice, ethPrice));
      res.status(200).send({ [userId]: `${roundToTwo(totalBalance)} USD` });
    }
  } catch (error) {
    console.error(`Failed to retrieve total balance for user ${userId}`);
    res.status(500).send({ "message": `Failed to retrieve total balance for user ${userId}` })
  }
}
)

app.get('/users/:id/balances', cors(), (req, res) => {
  const userId = req.params.id;

  if (!userBalances[userId]) {
    console.error(`Invalid input : User id ${userId} is not found`);
    res.status(404).send({ "message": `Invalid input - User id ${userId} is not found` });
  
  } else {
    res.status(200).send(userBalances[userId]);
  } 
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(8080, () => {
  console.log(`Example app listening at http://localhost:8080`)
})