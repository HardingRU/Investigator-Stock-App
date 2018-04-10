
import React, { Component }from 'react';
import Services from '../services';
import Stock from './PortfolioSingle'

class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null
    }
  }

  componentDidMount() {
    // getting the data that we need
    Services.getPortfolio()
      .then(data => {
        this.setState({
          apiDataLoaded: true,
          apiData: data.data.data,
        });
        console.log(this.state.apiData)

        for (let i=0; i<this.state.apiData.length; i++) {
          Services.getLatestData(this.state.apiData[i].ticker)
          .then(data2 => {
            Services.updateData(data2.data.dataset)
            .then(data3 => {
              console.log(data3)
            })
            .catch(err => {
              console.log('error': err)
            })
            console.log(data2.data.dataset)
          })
          .catch(err => {
            console.log('error': err)
          })
        }
      })
      .catch(err => {
        console.log('error': err);
      });
  }

  renderStocks() {
    return this.state.apiData.map(stock => <Stock {...stock} key={stock.id}/>)
  }

  render() {
    return (
      <div className="song-list">
      {
        this.state.apiDataLoaded
        ? this.renderStocks()

        : <h1>Loading...</h1>
      }
      </div>
    )
  }
}

export default Portfolio
