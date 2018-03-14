import React from 'react';
import PropTypes from 'prop-types';
import './urls.css';

// components
import URL from './URL/URL';

const URLs = props =>
  <div className="urls">
    <form className="url--form"
      onSubmit={props.handleNewUrl} >
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
      {props.urls.map((url, i) => <URL URL={url} key={i}/>)}
    </ul>
  </div>

URLs.propTypes = {
  urls: PropTypes.array.isRequired,
  newUrl: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleNewUrl: PropTypes.func.isRequired
};

export default URLs;

// {props.urls.map(() => {
//   return (
//     <li></li>
//   )
// })}
