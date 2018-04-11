import React from 'react';
import { Link } from 'react-router-dom';

const Result = (props) => {
  return (
    <div className="result">
      <h1><Link to={`/stock/${props.search_ticker}`}>{props.search_ticker}</Link> {props.search_name}</h1>
    </div>
  )
}
export default Result
