import React, { Component } from 'react';
import './App.css';

// components
import Login from './components/Login/Login';

class App extends Component {
  state = {
    loggedIn: false,
    email: '',
    password: '',
    existingUser: true
  }

  toggleExistingUser() {
    this.setState({
      existingUser: !this.state.existingUser
    })
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleAuthentication(e) {
    e.preventDefault();
    console.log('authenticating');
    if (this.state.existingUser) { // attempt a login

    } else { // attempt register

    }
  }

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
  }
}

export default App;
