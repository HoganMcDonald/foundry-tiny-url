import React from 'react';
import PropTypes from 'prop-types';
import './urls.css';

// components
import URL from './URL/URL';

const URLs = props =>
  <div className="urls">
    <form className="url--form">
      <input
        type="text"
        name="newUrl"
        className="new-url"
        placeholder="http://example.com"
        value={props.newUrl}
        onChange={props.handleOnChange} />
      <input
        type="submit"
        className="submit-url"
        value="&#43;" />
    </form>
    <hr/>
    <ul className="url-list">
      <li className="url"><p>Testing</p><button>&#43;</button></li>
      <li className="url"><p>Testing</p><button>&#43;</button></li>
      <li className="url"><p>Testing</p><button>&#43;</button></li>
      <li className="url"><p>Testing</p><button>&#43;</button></li>
    </ul>
  </div>

URLs.propTypes = {
  urls: PropTypes.array.isRequired,
  newUrl: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired
};

export default URLs;

// {props.urls.map(() => {
//   return (
//     <li></li>
//   )
// })}
