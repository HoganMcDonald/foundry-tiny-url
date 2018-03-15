# foundry-tiny-url

A tiny url web app.

biggest challenges
- fetch credentials
- validating url - 999 status codes
- generating an endpoint

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Installation](#installation)
- [Tech Used](#tech-used)
- [API Reference](#api-reference)
  - [/](#)
  - [/login](#login)
  - [/logout](#logout)
  - [/url](#url)
    - [/:id](#id)
  - [/user](#user)
  - [/:generatedUrl](#generatedurl)
- [Testing](#testing)
- [License](#license)
- [Next Steps](#next-steps)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

**To Run Locally**

1. Install all dependencies:
`npm install` in root directory, NOT client folder

2. Have [mongo](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) running locally in the background:
`mongod`

3. Run server in another terminal window:
`node index.js`

4. navigate to `localhost:5000` in the browser

**To Develop**

The front end was built with create-react-app and has its own package.json in the client directory. CRA is configured to process http requests through the node server as a proxy, but it serves the FE through its own server on another port. The outer node app uses the client/build directory in production and ignores the rest of the react app.

Install all dependencies:
`npm i && cd client && npm i && cd ..`

Start local development server:
`npm run dev`

Build any changes into production ready files used by express server:
`cd client && npm run build`

## Tech Used

**API**
- Node
- Express
- MongoDB/Mongoose
- Passport Js
- bcrypt
- request // verify urls
- shortId // npm package that generates id for urls

**Front End**
- Create-react-app
- react
- prop-types

**Testing**
- Mocha
- Chai
- Chai-http

## API Reference

### /

GET: serves index.html

### /login

POST: logs user in with email and password

### /logout

GET: logs user out and redirects to /

### /url

GET: returns all registered urls for currently logged in User
POST: Creates a new url with redirect location in request body

#### /:id

DELETE: deletes a url by id property

### /user

GET: returns the currently logged in user

### /:generatedUrl

GET: finds endpoint in db and either redirects or sends notFound.html handles all get requests not caught by other routes

## Testing

API tested with Mocha.

`npm test`

## License

[MIT License](./LICENSE)

## Next Steps

My list of tasks if the project doesn't warrant the use of something like trello.

- ~~express server up and running.~~
- ~~Mongo DB connected.~~
- ~~Login form.~~
- ~~Passport local strategy.~~
- ~~Handle auth on FE.~~
- ~~base 36 number system that increments.~~
- ~~create new url.~~
- ~~validate urls~~
- ~~fix style bug on urls~~
- ~~email validator~~
- ~~logout route~~
- ~~404 page for redirects~~
- ~~sort on urls~~
- ~~catch errors related to posting urls~~
- ~~test coverage on api~~

heroku bugs
- ~~url wrapping~~
- ~~hoganmcdonald.com won't verify~~
- ~~logout over modal~~
