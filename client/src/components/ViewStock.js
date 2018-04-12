
import React, { Component }from 'react';
import Services from '../services';
import {Line} from 'react-chartjs-2';

class ViewStock extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      chartData: {},
      ticker: null,
      unauth: false
    }
    this.storeData = this.storeData.bind(this);
    this.renderChart = this.renderChart.bind(this);
    this.renderData = this.renderData.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  storeData(input) {
    let tempDates = []
    let tempData = []
    for (let i = 0; i < input.length; i++) {
      tempDates.push(input[i][0])
      tempData.push(input[i][11])
    }
    tempData = tempData.reverse();
    tempDates = tempDates.reverse();
    let tempChart = {
      labels: tempDates,
      datasets: [
        {
          fillColor: "#25BDFF",
          strokeColor: "#25BDFF",
          pointColor: "#25BDFF",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "#25BDFF",
          data: tempData
        }
      ]
    }
    this.setState({
      chartData: tempChart,
      apiDataLoaded: true
    })
  }

  handleRemove(e) {
    console.log("inside remove")
  }

  UNSAFE_componentWillMount() {
    Services.cAuth()
      .then(data => {
        console.log(data)
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
    Services.getChart(this.props.match.params.ticker)
      .then(data => {
        let title = data.data.dataset.name.substring(0, data.data.dataset.name.length - 35)
        this.setState({
          apiData: data.data.dataset.data,
          ticker: title
        })
        this.storeData(this.state.apiData)
      })
      .catch(err => {
        console.log('error': err);
      })
  }

  renderChart() {
    return (
      <div className = "chart">
        <Line
          data={this.state.chartData}
          options={{
            title:{
              display:true,
              text: this.state.ticker + " Closing Stock Price"
            }
          }}
        />
      </div>
    )
  }

  renderData() {
    var rowList = []
    rowList.push(<h2>Date Open High Low Close</h2>)
    for (let i = 0; i < this.state.apiData.length; i++) {
      rowList.push(<div key={i}>{this.state.apiData[i][0]} {this.state.apiData[i][8]} {this.state.apiData[i][9]} {this.state.apiData[i][10]} {this.state.apiData[i][11]} </div>);
    }
    return rowList;
  }


  render() {
    if(this.state.unauth === false) {
      return (
        <div>
          <div><button name={this.props.match.params.ticker} onClick={this.handleRemove}>Add to Portfolio</button></div>
          <div> {this.state.apiDataLoaded ? this.renderChart() : <h1>Loading...</h1>} </div>
          <div> {this.state.apiDataLoaded ? this.renderData() : <h1></h1>} </div>
        </div>
      )
    }

    else {
      return (
        <div>
          <h1>Denied</h1>
        </div>
      )
    }

  }
}

export default ViewStock
