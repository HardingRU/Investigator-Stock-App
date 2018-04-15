import React, { Component }from 'react';
import Services from '../services';
import { Redirect } from 'react-router'
import Header from './Header'
import Footer from './Footer'

class AddStock extends Component {
  constructor() {
    super();
    this.state = {
      shares: null,
      price: null,
      unauth: false,
      addRedirect: false,
      badInput: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  UNSAFE_componentWillMount() {
    Services.cAuth()
      .then(data => {
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 401) {
          this.setState({
            unauth: true
          })
        }
      })
  }


  componentDidMount() {
    console.log(this.props.match.params.ticker)
  }

  handleInputChange(e) {
    let value = e.target.value;
    let name = e.target.name
    if(name === "shares") {
      this.setState({
        shares: value
      })
    }
    else {
      this.setState({
        price: value
      })
    }

  }

  handleFormSubmit(e) {
    e.preventDefault();
    console.log("inside submit")
    this.setState({
      badInput: false
    })
    console.log(Number.isInteger(this.state.shares))
    console.log(parseFloat(this.state.price))
    if(isNaN(parseInt(this.state.shares)) === true || isNaN(parseFloat(this.state.price)) === true) {
      this.setState({
        badInput: true
      })
    }
    else {
      e.preventDefault();
      let addData = {}
      addData.ticker = this.props.match.params.ticker
      addData.user = localStorage.email
      addData.shares = this.state.shares
      addData.price = this.state.price
      Services.editStock(addData)
        .then(data => {
          this.setState({
            addRedirect: true
          })
        })
        .catch(err => {
          console.log('error': err);
        })
      }
  }

  render() {
    if(this.state.addRedirect === false) {
      return (
        <div>
          <Header />
          <h2 className="centerMe">Edit in Portfolio</h2>
          { this.state.unauth === false
          ? (<form className="centerMe" onSubmit={this.handleFormSubmit}>
              <input className="spaceMe" type='text' name='shares' onChange={this.handleInputChange} placeholder='Number of Shares' />
              <input className="spaceMe" type='text' name='price' onChange={this.handleInputChange} placeholder='Price of Shares' />
              <input className="spaceMe" type='submit' value="Edit"/>
            </form>)
          : <Redirect to="/"/>
        }
        {this.state.badInput ? <h1>Invalid input: please use numbers</h1> : <h1> </h1>}
        <Footer />
        </div>
      )
    }
    else {
      return (
        <Redirect to="/portfolio"/>
      )
    }
  }
}

export default AddStock
