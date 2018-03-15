import React, { Component } from 'react';
import './App.css';

// components
import Login from './components/Login/Login';
import URLs from './components/URLs/URLs';
import Modal from './components/Modal/Modal';

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


  // reusable error handling for all fetch requests
  handleBadRequest = response => {
    if (!response.ok) {
      throw Error(response.status);
    } else {
      return response;
    }
  } // handleBadRequest()


  // authenticates user before app mounts. gets urls if auth succesful.
  getUser = ()=> {
    let requestObject = new Request('/user', {credentials: 'include'});
    fetch(requestObject)
      .then(this.handleBadRequest)
      .then(res => res.json())
      .then(user => {
        if (user) {
          this.setState({
            loggedIn: true,
            email: user.email,
            userId: user.id
          })
          return fetch(new Request('/url', {credentials: 'include'}))
        } else {
          throw Error('user not logged in');
        }
      })
      .then(this.handleBadRequest)
      .then(urls => urls.json())
      .then(body => {
        this.setState({
          urls: [...body.urls]
        })
      })
      .catch(err => {
        this.setState({
          loggedIn: false,
          email: '',
          userId: ''
        })
      });
  } // getUser()


  // flip existingUser (login - true vs. register - false)
  toggleExistingUser(e) {
    this.setState({
      existingUser: (e.target.name === 'login') ? true : false
    })
  } // toggleExistingUser()


  // handles all on change events for inputs
  handleOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  } // handleOnChange()


  // will post url and inject new url into state
  handleNewUrl(e) {
    e.preventDefault();
    const request = new Request('/url', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        redirect: `${(this.state.newUrl.startsWith('http://') || this.state.newUrl.startsWith('http://')) ? '' : 'https://'}${this.state.newUrl}`
      })
    })
    fetch(request)
      .then(this.handleBadRequest)
      .then( res => res.json() )
      .then( body => {
        this.setState({
          urls: [
            ...this.state.urls,
            body
          ],
          newUrl: ''
        })
      })
      .catch(err => {
        this.setState({
          modal: {
            active: true,
            heading: 'Invalid URL',
            body: 'it looks like the url you supplied doesn\'t go anywhere! try adding "https://" to the begining.'
          }
        })
      })
  } // handleNewUrl()


  // closes the active modal
  dismissModal = () =>
    this.setState({
      modal: {
        active: false
      }
    }) // dismissModal()


  // makes delete request to /url/:id
  removeUrlAt = id => {
    const request = new Request(`/url/${id}`, {
      method: 'delete',
      credentials: 'include'
    })

    fetch(request)
      .then( res => {
        this.setState({
          urls: this.state.urls.filter( url => url._id !== id)
        })
      })
      .catch( err => console.error(err) )
  } // removeUrlAt()


  // will either post /login or /register based on state
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
      .then(this.handleBadRequest)
      .then( res => this.getUser())
      .catch(err => {
        if (this.state.existingUser) {
          this.setState({
            modal: {
              active: true,
              heading: 'Invalid Credentials',
              body: 'The email or password you used don\'t match what we have on file.'
            }
          })
        } else {
          this.setState({
            modal: {
              active: true,
              heading: 'Invalid Email',
              body: 'The email you provided doesn\'t seem to be valid.'
            }
          })
        }
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
          toggleExistingUser={(e) => this.toggleExistingUser(e)}
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
          handleNewUrl={(e) => this.handleNewUrl(e)}
          removeUrlAt={this.removeUrlAt} />
      )
    }

    return (
      <div className="App">
        <h1 className="main-header">Foundry Tiny URL</h1>
        <div className="dashboard">
          {content}
          {(this.state.modal.active) ? <Modal modal={this.state.modal} dismissModal={() => this.dismissModal()}/> : null}
        </div>
        {(this.state.loggedIn) ? <a className="logout" href="/logout">Log Out</a> : null}
      </div>
    );
  } // render()

} // App


export default App;
