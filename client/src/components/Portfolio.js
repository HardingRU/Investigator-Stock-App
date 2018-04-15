
import React, { Component }from 'react';
import Services from '../services';
import Stock from './PortfolioSingle'
import { Redirect } from 'react-router'


class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      unauth: false,
      user_id: null
    }
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
      return this.state.apiData.map(stock => <Stock {...stock} key={stock.id}/>)

    }
  }

  render() {
    if (this.state.unauth === false) {
      return (
        <div>
        Ticker Company Shares Owned Purchase Price Current Price LTD
        { this.state.apiDataLoaded ? this.renderStocks() : <h1>Loading...</h1>}
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
