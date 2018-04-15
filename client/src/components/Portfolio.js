
import React, { Component }from 'react';
import Services from '../services';
import Stock from './PortfolioSingle'
import { Redirect } from 'react-router'
import Header from './Header'
import Footer from './Footer'


class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      unauth: false,
      user_id: null,
      portfolioValue: null
    }
    this.renderValue = this.renderValue.bind(this)
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
    Services.findUser(localStorage.email)
    .then(response => {
      this.setState({
        user_id: response.data.id
      })

      Services.getPortfolio(this.state.user_id)
          .then(data => {
            this.setState({
              apiDataLoaded: true,
              apiData: data.data.data,
            });
            this.renderValue();
            for (let i=0; i<this.state.apiData.length; i++) {
                  Services.getLatestData(this.state.apiData[i].ticker, this.state.user_id)
                  .then(data2 => {
                          Services.updateData(data2.data.data.dataset, this.state.user_id)
                          .then(data3 => {
                          })
                          .catch(err => {
                            console.log("inside updateData", err)
                          })
                  })
                  .catch(err => {
                    console.log("inside getLatest", err)
                  })
            }
          })
          .catch(err => {
            console.log("inside getPort", err);
          })


    })
    .catch(err => {
      console.log(err)
    })

  }

  renderStocks() {
    if(this.state.apiData.length === 0) {
      return (<h1>You currently have no stocks in your portfolio.  Use <a href ="/search">Search</a> to find and add stocks.</h1>)
    }

    else {
      return (
        this.state.apiData.map(stock => <Stock {...stock} key={stock.id}/>))

    }
  }

  renderValue() {
    let portfolioValue = null
    for (let i=0; i<this.state.apiData.length; i++) {
      console.log(this.state.apiData[i])
      let tempValue = this.state.apiData[i].shares_owned * this.state.apiData[i].current_price
      portfolioValue = portfolioValue + tempValue
    }
    this.setState({
      portfolioValue: portfolioValue
    })
  }

  render() {
    if (this.state.unauth === false) {
      return (
        <div>
        <Header />
        <h2 className="centerMe"> My Portfolio </h2>
        { this.state.apiDataLoaded ? this.renderStocks() : <h1>Loading...</h1>}
        { this.state.portfolioValue ? <h2 className="portValue">Portfolio Value: ${this.state.portfolioValue}</h2> : <h2 className="portValue"></h2>}
        <Footer />
        </div>
      )
    }
    else {
      return (
        <Redirect to="/"/>
      )
    }
  }
}

export default Portfolio
