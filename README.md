# foundry-tiny-url

A tiny url web app.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Tech Used](#tech-used)
- [Installation](#installation)
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

## Tech Used

- Node
- Express
- MongoDB/Mongoose
- Chai/chai-http

## Installation

**To run Locally**

Install all dependencies:
`npm install`

Have mongo running locally in the background:
`mongod`

Run build from production server in another terminal window:
`node index.js`

navigate to `localhost:5000` in the browser


**To develop react app**

Install all dependencies:
`npm install`

Start local development server:
`npm start`

Build any changes into production ready files used by express server:
`npm run build`

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
- Login form. 30mins
- Passport local strategy. 20mins
- Handle auth on FE. 10mins
- base 36 number system that increments. 20mins
- create new url. 30mins
