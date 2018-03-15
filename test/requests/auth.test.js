const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../index');

// use chai-http
chai.use(chaiHttp);
const request = chai.request;

describe('/register', () => {
  it('should register a new user', (done) => {
    request(app)
      .post()
  })
})

// // create a test user before every test
// beforeEach(done => {
//   let testUser = new User(Test.user);
//   testUser.save(err=> {
//     if (err) {
//       console.log(err);
//       done();
//     } else {
//       Test.user._id = testUser._id.toString();
//       done();
//     }
//   })
// }) // beforeEach()
//
// // drop the test db
// afterEach(done => {
//   DB.db.dropDatabase();
// }) // afterEach()
