import React from 'react';
import PropTypes from 'prop-types';
import './URL.css';

const currentUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.host;
  } else {
    return 'localhost:5000';
  }
}

const URL = props =>
  <li className="url">
    <div className="data">
      <p>Domain:  {props.URL.redirect}</p>
      <p>url:  <a href={`/${props.URL.endpoint}`}>{currentUrl()}/{props.URL.endpoint}</a></p>
      <p>Visits:  {props.URL.visits}</p>
    </div>
    <div className="fade">
      <button onClick={props.removeUrlAt}>&#215;</button>
    </div>
  </li>

URL.propTypes ={
  URL: PropTypes.object.isRequired,
  removeUrlAt: PropTypes.func.isRequired
}

export default URL;
