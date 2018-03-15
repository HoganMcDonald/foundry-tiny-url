const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const Test = require('../testData');
const app = require('../../index');

// use chai-http
chai.use(chaiHttp);
const request = chai.request;

describe('/register', () => {
  it('POST: should register a new user', (done) => {
    request(app)
      .post('/register')
      .send(Test.user)
      .end((err, res, body) => {
        if (err) {
          done(err);
        } else {
          expect(res).to.have.status(201);
          Test.user._id = res.body._id;
          done();
        }
      })
  })

});

describe('/login', () => {
  it('POST: should login created user', () => {
    request(app)
      .post('/login')
      .send(Test.user)
      .end((err, res, body) => {
        if (err) {
          done(err);
        } else {
          expect(res).to.have.status(200);
          done();
        }
      })
  })
})

describe('/logout', () => {
  it('GET: should log out user and redirect to /', () => {
    request(app)
      .get('/logout')
      .end((err, res, body) => {
        if (err) {
          done(err);
        } else {
          expect(res).to.redirect;
          done();
        }
      })
  })
})
