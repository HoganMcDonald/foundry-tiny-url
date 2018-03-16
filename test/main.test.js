process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = 'mongodb://localhost/test';

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

	const app = require('../index');

	// drop the test db
	after(done => {
	  DB.db.dropDatabase();
		done();
	}) // afterEach()

	describe('/', () => {
		it('GET: should serve the react app', (done) => {
			request(app)
				.get('/')
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res).to.be.html;
					done();
				})
		})
	})


  describe('Auth Routes', () => {
    require('./requests/auth.test');
  });

  describe('User Routes', () => {
    require('./requests/user.test');
  });

  describe('Url Routes', () => {
    require('./requests/url.test');
  });

})
