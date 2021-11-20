import chai from 'chai';
import { app, calculateTotal } from '../main/index.js';
import httpChai from 'chai-http';

const { assert } = chai;
chai.use(httpChai);

const testUserBalances = {
  "100001": {
    "BTC": "0.5",
    "ETH": "2"
  },
  "100002": {
    "BTC": "0.1"
  },
  "100003": {
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

// E2ETest - Check if we are able to retrieve the total balance of the user properly
describe('/GET user total balance', () => {
  it('it should GET total balance of user in USD', (done) => {

    for (const userBalance in testUserBalances) {
      chai.request(app)
        .get(`/users/${userBalance}/total-balance`)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.notEqual(res.body, null);
          assert.equal(typeof (res.body), 'object');
        });
    }

    done();
  });
})

// E2ETest - Check if we receive an error message if the user id is invalid 
describe('/GET user total balance', () => {
  it('it should return error message', (done) => {
    chai.request(app)
      .get(`/users/10200/total-balance`)
      .end((err, res) => {
        assert.equal(res.status, 404);
        assert.notEqual(res.body, null);
        assert.equal(res.body["message"], `Invalid input - User id 10200 is not found`);
      });
    done();
  });
})

// UnitTest - Check that the calculation of the total balance is correct when user has balance under both markets i.e. both ETHUSD and BTCUSD
describe('UserBalances', async () => {
  it('Assuming BTC is 60000 and ETH is 3000, user has 0.5 BTC and 2 ETH return 36000', async () => {
    let result = await calculateTotal(testUserBalances["100001"], 60000, 3000);
    assert.equal(result, 36000);
  });
});

// UnitTest - Check that the calculation of the total balance is correct when user has balance under only a single market i.e. only ETHUSD
describe('UserBalances', async () => {
  it('Assuming BTC is 60000, user has 0.5 BTC and 2 ETH return 36000', async () => {
    let result = await calculateTotal(testUserBalances["100002"], 60000, 3000);
    assert.equal(result, 6000);
  });
});

