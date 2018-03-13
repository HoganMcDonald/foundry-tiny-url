import React, { Component } from 'react';
import './App.css';

// components
import Login from './components/Login/Login';

class App extends Component {

  state = {
    loggedIn: false,
    email: 'hpeter.mcdonald@gmail.com',
    password: '123',
    existingUser: true,
    userId: "",
    modal: {
      active: false,
      heading: '',
      body: ''
    },
    res: {}
  } // state

  componentWillMount() {
    this.getUser();
  } // componentWillMount()

  getUser = ()=> {
    let requestObject = new Request('/user', {credentials: 'include'});
    fetch(requestObject)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(body => {
        console.log(body.email);
        return body;
      })
  } // getUser()

  toggleExistingUser() {
    this.setState({
      existingUser: !this.state.existingUser
    })
  } // toggleExistingUser()

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  } // handleEmailChange()

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  } // handlePasswordChange()

  handleAuthentication = (e) => {
    e.preventDefault();
    const requestObject = new Request((this.state.existingUser) ? '/login' : '/register', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    });

    fetch(requestObject)
      .then( res => res.json())
      .then( body => {
        this.setState({
          email: body.email,
          userId: body.id,
          loggedIn: true
        })
      })
      .catch(err => {
        this.setState({
          modal: {
            active: true,
            heading: 'Invalid Credentials',
            body: 'The username or password you used don\'t match what we have on file.'
          }
        })
      });

    // if (this.state.existingUser) { // attempt a login
    //   fetch('/login', requestObject)
    //     .then( res => res.json())
    //     .then( body => {
    //       this.setState({
    //         email: body.email,
    //         userId: body.id,
    //         loggedIn: true
    //       })
    //     })
    //     .catch(err => {
    //       this.setState({
    //         modal: {
    //           active: true,
    //           heading: 'Invalid Credentials',
    //           body: 'The username or password you used don\'t match what we have on file.'
    //         }
    //       })
    //     });
    // } else { // attempt register
    //   fetch('/register', requestObject)
    //     .then( res => res.json())
    //     .then( body => {
    //       this.setState({
    //         email: body.email,
    //         userId: body.id,
    //         loggedIn: true
    //       })
    //     })
    //     .catch(err => {
    //       this.setState({
    //         modal: {
    //           active: true,
    //           heading: 'Username Not Available',
    //           body: 'The username you attempted to use is not available.'
    //         }
    //       })
    //     });
    // }
  } // handleAuthentication()

  render() {

    let login;
    if (!this.state.loggedIn) {
      login = (
        <Login
          email={this.state.email}
          password={this.state.password}
          existingUser={this.state.existingUser}
          toggleExistingUser={() => this.toggleExistingUser()}
          handleEmailChange={(e)=> this.handleEmailChange(e)}
          handlePasswordChange={(e)=> this.handlePasswordChange(e)}
          handleLogin={(e) => this.handleAuthentication(e)} />
      )
    }

    return (
      <div className="App">
        <h1 className="main-header">Foundry Tiny URL</h1>
        <div className="dashboard">
          {login}

        </div>
      </div>
    );
  } // render()

}

export default App;
