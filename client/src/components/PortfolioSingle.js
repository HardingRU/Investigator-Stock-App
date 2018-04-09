import React from 'react';
import { Link } from 'react-router-dom';

const Stock = (props) => {
  return (
    <div className="stock">
      <h1><Link to={`/stock/${props.id}`}>{props.ticker}</Link></h1>
    </div>
  )
}
export default Stock
