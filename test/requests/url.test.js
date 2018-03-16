const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const Test = require('../testData');
const User = require('../../server/models/User.model');
const Url = require('../../server/models/Url.model');
const app = require('../../index');
const DB = require('../../server/db');


// use chai-http
chai.use(chaiHttp);
const request = chai.request;

describe('/url', (done) => {

  // create and authenticate user before suite
  beforeEach(done => {
    DB.db.dropDatabase();
    request(app)
      .post('/register')
      .send(Test.user)
      .end((err, res, body) => {
        if (err) {
          done(err);
        } else {
          Test.user._id = res.body._id;
          done();
        }
      })

  }); // before()

  it('POST: should create this url object - may fail if domain blocks based on user agent', (done) => {
      request(app)
        .post('/url')
        .send(Test.validUrls[0])
        .end((err, res, body) => {
          if (res.status !== 201) {
            console.log('should be valid', Test.validUrls[0])
          }
          expect(res).to.have.status(201);

        });
    done();
  }) // POST - valid

  it('POST: should not create this url object - may fail if domain blocks based on user agent', (done) => {
      request(app)
        .post('/url')
        .send(Test.invalidUrls[0])
        .end((err, res, body) => {
          if (res.status !== 400) {
            console.log('should be invalid', Test.invalidUrls[0])
          }
          expect(res).to.have.status(400);
        });
    done();
  }) // POST - invalid

});
