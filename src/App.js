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
      active: true,
      heading: '',
      body: ''
    },
    res: {}
  } // state

  componentWillMount() {
    this.getUser();
  }

  getUser() {
    fetch('/user')
      .then( res => {
        console.log(res)
        if (res.status < 400) {
          this.setState({
            email: res.body.email,
            userId: res.body.id,
            loggedIn: true
          })
        }
      });
  }

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

  handleAuthentication(e) {
    e.preventDefault();
    const requestObject = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    };

    if (this.state.existingUser) { // attempt a login
      fetch('/login', requestObject)
        .then( res => {
          this.getUser();
        })
    } else { // attempt register
      fetch('/register', requestObject)
        .then( res => {
          console.log(res.status);
          this.getUser();
        })
    }
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
