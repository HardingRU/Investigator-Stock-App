import React from 'react';
import { Link } from 'react-router-dom';

const Result = (props) => {
  return (
    <div className="result">
      <h3 className="linker"><Link to={`/stock/${props.search_ticker}`}>{props.search_ticker} {props.search_name}</Link></h3>
    </div>
  )
}
export default Result
