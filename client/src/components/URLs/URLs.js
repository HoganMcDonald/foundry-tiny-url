import React from 'react';
import PropTypes from 'prop-types';
import './urls.css';

// components
import URL from './URL/URL';

const URLs = props => {

  // sort urls by selected key
  const compare = (a, b) => {
    if (a[props.sortKey] < b[props.sortKey])
      return (props.sortKey === 'visits') ? 1 : -1; // descending order for visits only
    if (a[props.sortKey] > b[props.sortKey])
      return (props.sortKey === 'visits') ? -1 : 1;;
    return 0;
  }

  return (
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
      <div className="sort-options">
        <button
          className={(props.sortKey === 'redirect') ? 'active' : ''}
          name="redirect"
          onClick={props.changeSort}>Domain</button>
        <button
          className={(props.sortKey === 'endpoint') ? 'active' : ''}
          name="endpoint"
          onClick={props.changeSort}>url</button>
        <button
          className={(props.sortKey === 'visits') ? 'active' : ''}
          name="visits"
          onClick={props.changeSort}>Visits</button>
      </div>
      <ul className="url-list">
        {props.urls.sort(compare).map((url, i) => {
          return (
            <URL
              URL={url}
              key={url._id}
              removeUrlAt={() => props.removeUrlAt(url._id)} />
          )
        })}
      </ul>
    </div>
  )}

URLs.propTypes = {
  urls: PropTypes.array.isRequired,
  newUrl: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleNewUrl: PropTypes.func.isRequired,
  removeUrlAt: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  changeSort: PropTypes.func.isRequired
};

export default URLs;
