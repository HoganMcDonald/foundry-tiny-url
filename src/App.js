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

  render() {
    return (
      <div className="App">
        <h1 className="main-header">Foundry Tiny URL</h1>
        <div className="dashboard">
          <Login
            email={this.state.email}
            password={this.state.password}
            existingUser={this.state.existingUser}
            toggleExistingUser={() => this.toggleExistingUser()} />
        </div>
      </div>
    );
  }
}

export default App;
