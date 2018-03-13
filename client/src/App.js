import React, { Component } from 'react';
import './App.css';

// components
import Login from './components/Login/Login';
import URLs from './components/URLs/URLs';

class App extends Component {

  state = {
    loggedIn: false,
    email: '',
    password: '',
    existingUser: true,
    userId: "",
    urls: [],
    newUrl: "",
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
      .then(res => {
        if (res.status < 400) {
          return res.json();
        }
      })
      .then(user => {
        if (user) {
          this.setState({
            loggedIn: true,
            email: user.email,
            userId: user.id
          })
        }
      })
      .catch(err => console.error(err));
  } // getUser()

  toggleExistingUser() {
    this.setState({
      existingUser: !this.state.existingUser
    })
  } // toggleExistingUser()

  handleOnChange(e) {
    console.log('on change')
    this.setState({
      [e.target.name]: e.target.value
    });
  } // handleOnChange()

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
  } // handleAuthentication()

  render() {

    let content;
    if (!this.state.loggedIn) {
      content = (
        <Login
          email={this.state.email}
          password={this.state.password}
          existingUser={this.state.existingUser}
          toggleExistingUser={() => this.toggleExistingUser()}
          handleOnChange={(e)=> this.handleOnChange(e)}
          handlePasswordChange={(e)=> this.handleOnChange(e)}
          handleLogin={(e) => this.handleAuthentication(e)} />
      )
    } else {
      content = (
        <URLs
          newUrl={this.state.newUrl}
          urls={this.state.urls}
          handleOnChange={(e) => this.handleOnChange(e)}
           />
      )
    }

    return (
      <div className="App">
        <h1 className="main-header">Foundry Tiny URL</h1>
        <div className="dashboard">
          {content}

        </div>
      </div>
    );
  } // render()

}

export default App;
