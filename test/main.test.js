process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = 'localhost:27017/test';

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const DB = require('../server/db');
const mongoose = require('mongoose');

const Test = require('./testData');

chai.use(chaiHttp);
const request = chai.request;

// mocha check
describe('Mocha', ()=> {
	it('should run our tests using npm', ()=> {
		expect(true).to.be.ok;
	});
});

describe('validateEmail', () => {
  const validateEmail = require('../server/utils/validateEmail').validateEmail

  it('should validate these emails', () => {
    let test = Test.validEmails
      .map(testCase => {
        if (!validateEmail(testCase)) {
          console.log(`--------${testCase} should be valid email`);
        }
        return validateEmail(testCase);
      })
      .reduce((accumulator, currentValue)=> {
        return (accumulator && currentValue)
      }, true);
      expect(test).to.be.true;
  })
  it('should not validate these emails', () => {
    let test = Test.invalidEmails
      .map(testCase => {
        if (validateEmail(testCase)) {
          console.log(`--------${testCase} should not be valid email`);
        }
        return !validateEmail(testCase);
      })
      .reduce((accumulator, currentValue)=> {
        return (accumulator && currentValue)
      }, true);
      expect(test).to.be.true;
  })
})

describe('API', () => {

  // create a test user before every test
  beforeEach(done => {
    let testUser = new User(Test.user);
		testUser.save(err=> {
			if (err) {
				console.log(err);
			} else {
				Test.user._id = testUser._id.toString();
				done();
			}
    })
  }) // beforeEach()

  // drop the test db
  afterEach(done => {
    DB.db.dropDatabase();
  }) // afterEach()

  describe('Pre Auth');

  describe('Post Auth')
})
