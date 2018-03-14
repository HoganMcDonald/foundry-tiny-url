import React from 'react';
import PropTypes from 'prop-types';
import './URL.css';

const URL = props =>
  <li className="url">
    <p>{props.URL.redirect}</p>
    <div className="fade">
      <button>&#215;</button>
    </div>
  </li>

URL.propTypes ={
  URL: PropTypes.object.isRequired,
  handleDeleteAt: PropTypes.func.isRequired
}

export default URL;
