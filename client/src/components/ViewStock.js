
import React, { Component }from 'react';
import Services from '../services';

class ViewStock extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null
    }
  }

  componentDidMount() {
    console.log("Mounted")
    Services.getChart("AAPL")
      .then(data => {
        this.setState({
          apiDataLoaded: true,
          apiData: data.data.dataset.data
        })
        console.log(this.state.apiData)
      })
      .catch(err => {
        console.log('error': err);
      })
  }

  renderChart() {
    return <div>
        <h2>Date Open High Low Close</h2>
        <div>{this.state.apiData[0][0]} {this.state.apiData[0][8]} {this.state.apiData[0][9]} {this.state.apiData[0][10]} {this.state.apiData[0][11]} </div>
        <div>{this.state.apiData[1][0]} {this.state.apiData[1][8]} {this.state.apiData[1][9]} {this.state.apiData[1][10]} {this.state.apiData[1][11]} </div>
        <div>{this.state.apiData[2][0]} {this.state.apiData[2][8]} {this.state.apiData[2][9]} {this.state.apiData[2][10]} {this.state.apiData[2][11]} </div>

    </div>
  }

  render() {
    return (
      <div>
      {
        this.state.apiDataLoaded
        ? this.renderChart()
        : <h1>Loading...</h1>
      }
      </div>
    )
  }
}

export default ViewStock
