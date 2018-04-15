
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
      portfolioValue: null,
      editRedirect: false,
      deleted: false
    }
    this.renderValue = this.renderValue.bind(this)
    this.remove = this.remove.bind(this)


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
      let retArray = []
      retArray.push(<tr><th>Company</th><th>Shares Owned</th><th>Purchase Price</th><th>Current Price</th><th>LTD</th><th></th><th></th></tr>)
      for (let i = 0; i < this.state.apiData.length; i++) {
        let myLTD = ((this.state.apiData[i].current_price - this.state.apiData[i].purchase_price) / this.state.apiData[i].purchase_price) * 100
        myLTD = myLTD.toFixed(2)
        let editLink = "/edit/" + this.state.apiData[i].ticker
        let stockLink = "/stock/" + this.state.apiData[i].ticker
        retArray.push(<tr>
                          <td><a href={stockLink}>{this.state.apiData[i].stock_name}</a></td>
                          <td>{this.state.apiData[i].shares_owned}</td>
                          <td>{this.state.apiData[i].purchase_price}</td>
                          <td>{this.state.apiData[i].current_price}</td>
                          <td>{myLTD}%</td>
                          <td><a href={editLink}>Edit Holdings</a></td>
                          <td>{<button id={this.state.apiData[i].ticker} className="btn btn-xs portButt buttColor" onClick={this.remove}>Delete Holdings</button>}</td>
                      </tr>)
      }
      return (
        retArray
      )
    }

    // else {
    //   return (
    //     this.state.apiData.map(stock => <Stock {...stock} key={stock.id}/>))
    //
    // }
  }



  remove(e) {
    console.log("event", e.target.id)
    Services.removeStock(e.target.id, localStorage.email)
      .then(response => {
        this.setState({
          deleted: true
        })
      })
      .catch(err => {
        console.log(err)
      })
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
    if (this.state.deleted === false) {
      if (this.state.unauth === false) {
        return (
          <div>
          <Header />
          <h2 className="centerMe"> My Portfolio </h2>
          { this.state.portfolioValue ? <h2 className="portValue">Portfolio Value: ${this.state.portfolioValue}</h2> : <h2 className="portValue"></h2>}
          <table className="portfolio Table">
          { this.state.apiDataLoaded ? this.renderStocks() : <h1>Loading...</h1>}
          </table>
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
    else {
      return (
        <Redirect to="/redirect"/>
      )
    }

  }
}

export default Portfolio
