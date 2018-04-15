import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Services from '../services';



class Stock extends Component {
  constructor() {
    super();
    this.state = {
      editRedirect: false,
      deleted: false,
      ltd: null
    }
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    let myLTD = (this.props.current_price / this.props.purchase_price) * 100
    let myYTD = (this.props.current_price / this.props.ytd) * 100
    this.setState({
      ltd: myLTD.toFixed(2)

    })
  }

  edit() {
    this.setState({
      editRedirect: true
    })
  }

  remove() {
    Services.removeStock(this.props.ticker, localStorage.email)
      .then(response => {
        this.setState({
          deleted: true
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    if(this.state.deleted === false) {
      if(this.state.editRedirect === false) {
        return (
          <div>
            
            <h3><Link to={`/stock/${this.props.ticker}`}>{this.props.ticker}</Link> {this.props.stock_name} {this.props.shares_owned} ${this.props.purchase_price} ${this.props.current_price} {this.state.ltd}%
              <button className="btn btn-xs portButt" onClick={this.edit}>Edit Holdings</button>
              <button className="btn btn-xs portButt" onClick={this.remove}>Delete Holdings</button>
            </h3>
          </div>
        )
      }
      else {
        return (
          <Redirect to={`/edit/${this.props.ticker}`}/>
        )
      }
    }
    else {
      return (
        <Redirect to="/redirect"/>
      )
    }


  }
}
export default Stock
