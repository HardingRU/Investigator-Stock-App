
import React, { Component }from 'react';
import Services from '../services';
// services not inside of the components dir
import Stock from './PortfolioSingle' // we'll create this component in a second

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
            console.log(data2)
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

  renderSongs() {
    return this.state.apiData.map(stock => <Stock {...stock} key={stock.id}/>)
    // fancy ES6 Destructuring here
    // like cracking an egg, this makes all the keys
    // inside of the song object will be available to the
    // song component as props
  }

  render() {
    return (
      <div className="song-list">
      {
        this.state.apiDataLoaded
        ? this.renderSongs()

        : <h1>Loading...</h1>
      }
      </div>
    )
  }
}

export default Portfolio
