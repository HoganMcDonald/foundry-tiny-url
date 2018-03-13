import React from 'react';
import PropTypes from 'prop-types';
import './URL.css';

const URL = props =>
  <li className="url">
    <p>{props.URL.endpoint}</p>
    <button>&#43;</button>
  </li>

URL.propTypes ={
  URL: PropTypes.object.isRequired,
  handleDeleteAt: PropTypes.func.isRequired
}

export default URL;
