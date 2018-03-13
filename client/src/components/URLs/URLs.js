import React from 'react';
import PropTypes from 'prop-types';
import './urls.css';

const URLs = props =>
  <div className="urls">
    <form className="url--form">
      <input
        type="text"
        class="new-url"
        placeholder="http://example.com"
        value={props.newUrl} />
      <input
        type="submit"
        className="submit-url"
        value="&#43;" />
    </form>
    <ul>

    </ul>
  </div>

URLs.propTypes = {
  urls: PropTypes.array.isRequired,
  newUrl: PropTypes.string.isRequired,
  handleNewUrlChange: PropTypes.func.isRequired
};

export default URLs;

// {props.urls.map(() => {
//   return (
//     <li></li>
//   )
// })}
