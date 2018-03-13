import React from 'react';
import PropTypes from 'prop-types';
import './login.css';

const Login = props =>
  <div className="login">
    <section className="login--welcome">
      <h1>Welcome.</h1>
      <p>Create trackable, tiny urls that redirect anywhere on the web. Login
        or sign up to get started.</p>
      <hr/>
    </section>
    <button
      className={`${(props.existingUser) ? 'active' : ''}
      toggle-Button`}
      onClick={props.toggleExistingUser}>
      Login
    </button>
    <button
      className={`${(!props.existingUser) ? 'active' : ''}
      toggle-Button`}
      onClick={props.toggleExistingUser}>
      Sign Up
    </button>
    <form className="login--form" onSubmit={props.handleLogin}>
      <input
        type="email"
        name="email"
        placeholder="email"
        value={props.email}
        onChange={props.handleOnChange} />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={props.password}
        onChange={props.handleOnChange} />
      <input
        className="submit"
        type="submit"
        value={(props.existingUser ? 'Login' : 'Register')} />
    </form>
  </div>

Login.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  existingUser: PropTypes.bool.isRequired,
  toggleExistingUser: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
}

export default Login;
