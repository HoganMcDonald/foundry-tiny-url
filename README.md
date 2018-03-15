# foundry-tiny-url

A tiny url web app.

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
  - [/user](#user)
  - [/:generatedUrl](#generatedurl)
- [Testing](#testing)
- [License](#license)
- [Next Steps](#next-steps)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

**To run Locally**

Install all dependencies:
`npm install` in root directory, NOT client folder

Have [mongo](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) running locally in the background:
`mongod`

Run server in another terminal window:
`node index.js`

navigate to `localhost:5000` in the browser

**To develop react app**

The front end was built with create-react-app and has its own package.json in the client directory. CRA is configured to process http requests through the node server as a proxy, but it serves the FE through its own server on another port. The outer node app uses the client/build directory in production and ignores the rest of the react app.

Install all dependencies:
`npm i && cd client && npm i && cd ..`

Start local development server:
`npm run dev`

Build any changes into production ready files used by express server:
`cd client && npm run build`

## Tech Used

- Node
- Express
- MongoDB/Mongoose
- Chai/chai-http

## API Reference

### /

### /login

### /logout

### /url

### /user

### /:generatedUrl

## Testing

What tech is used for testing.

`How to run the tests`

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
- test coverage on api
- sort on urls
- forgot password
- catch errors related to getting urls

heroku bugs
- url not wrapping
- hoganmcdonald.com won't verify
