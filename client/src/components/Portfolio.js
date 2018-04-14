
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
        Services.findUser(localStorage.email)
        .then(response => {
          this.setState({
            user_id: response.data.id
          })
          console.log(this.state.user_id)
        })
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
        Services.getPortfolio(this.state.user_id)
            .then(data => {
              this.setState({
                apiDataLoaded: true,
                apiData: data.data.data,
              });
              console.log("after state", this.state)
              for (let i=0; i<this.state.apiData.length; i++) {
                Services.getLatestData(this.state.apiData[i].ticker)
                .then(data2 => {
                  console.log(data2)
                        Services.updateData(data2.data.data.dataset)
                        .then(data3 => {
                          console.log(data3)
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
  }

  renderStocks() {
    return this.state.apiData.map(stock => <Stock {...stock} key={stock.id}/>)
  }

  render() {
    if (this.state.unauth === false) {
      return (
        <div>
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
