
import React, { Component }from 'react';
import Services from '../services';
import {Line} from 'react-chartjs-2';
import { Redirect } from 'react-router';


class ViewStock extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      chartData: {},
      ticker: null,
      unauth: false,
      exportDataReady: false,
      exportData: null
    }
    this.storeData = this.storeData.bind(this);
    this.renderChart = this.renderChart.bind(this);
    this.renderData = this.renderData.bind(this);
    this.addStock = this.addStock.bind(this);
    this.exportData = this.exportData.bind(this);
    this.rerender = this.rerender.bind(this);
    this.oneWeek = this.oneWeek.bind(this);
    this.oneMonth = this.oneMonth.bind(this);
    this.threeMonths = this.threeMonths.bind(this);
    this.sixMonths = this.sixMonths.bind(this);
    this.oneYear = this.oneYear.bind(this);
    this.fiveYears = this.fiveYears.bind(this)
    this.max = this.max.bind(this)
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

  addStock(e) {
    console.log("inside remove")
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
    Services.getChart(this.props.match.params.ticker)
      .then(data => {
        let title = data.data.data.dataset.name.substring(0, data.data.data.dataset.name.length - 35)
        this.setState({
          apiData: data.data.data.dataset.data,
          ticker: title
        })
        this.storeData(this.state.apiData)
      })
      .catch(err => {
        console.log(err);
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

  exportData() {
    let tempData = []
    for(let i = 0; i < this.state.apiData.length; i++) {
      tempData.push(this.state.apiData[i][0])
      tempData.push(this.state.apiData[i][1])
      tempData.push(this.state.apiData[i][2])
      tempData.push(this.state.apiData[i][3])
      tempData.push(this.state.apiData[i][4])
      tempData.push(this.state.apiData[i][5])
      tempData.push(this.state.apiData[i][6])
      tempData.push(this.state.apiData[i][7])
      tempData.push(this.state.apiData[i][8])
      tempData.push(this.state.apiData[i][9])
      tempData.push(this.state.apiData[i][10])
      tempData.push(this.state.apiData[i][11])
      tempData.push(this.state.apiData[i][12])
    }
    const multiDataSet = [
      {
          columns: ["Date", "Open", "High", "Low", "Close", "Volume", "Dividend", "Split", "Adjusted Open", "Adjusted High", "Adjusted Low", "Adjusted Close", "Adjusted Volume"],
          data: tempData
        }
    ]
/*    this.setState({
      exportDataReady: true,
      exportData: multiDataSet
    })*/
    Services.export(this.props.match.params.ticker)
  }

  renderData() {
    var rowList = []
    rowList.push(<tbody className="tableData"><tr><th>Date</th><th>Open</th><th>High</th><th>Low</th><th>Close</th></tr></tbody>)
    console.log("rowList", rowList)
    for (let i = 0; i < this.state.apiData.length; i++) {
      rowList.push(<tr key={i}>{this.state.apiData[i][0]}<td>{this.state.apiData[i][8]}</td><td>{this.state.apiData[i][9]}</td><td>{this.state.apiData[i][10]}</td><td>{this.state.apiData[i][11]}</td></tr>);
    }
    return rowList;
  }

  rerender(num) {

    let tempDates = []
    let tempData = []
    if(num > this.state.apiData.length) {
      this.max()
    }
    else {
      for (let i = 0; i < num; i++) {
        tempDates.push(this.state.apiData[i][0])
        tempData.push(this.state.apiData[i][11])
      }
      tempData = tempData.reverse()
      tempDates = tempDates.reverse()
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
      })
    }
  }

  oneWeek() {
    this.rerender(5)
  }

  oneMonth() {
    this.rerender(20)
  }

  threeMonths() {
    this.rerender(60)
  }

  sixMonths() {
    this.rerender(120)
  }

  oneYear() {
    this.rerender(240)
  }

  fiveYears() {
    this.rerender(1200)
  }

  max() {
    let tempDates = []
    let tempData = []
    for (let i = 0; i < this.state.apiData.length; i++) {
      tempDates.push(this.state.apiData[i][0])
      tempData.push(this.state.apiData[i][11])
    }
    tempDates = tempDates.reverse()
    tempData = tempData.reverse()
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
    console.log("temp", tempDates)
    this.setState({
      chartData: tempChart,
    })
  }


  render() {
      if(this.state.unauth === false) {
        return (
          <div>
            <div><button name={this.props.match.params.ticker} onClick={this.addStock}>Add to Portfolio</button></div>
            <div><button onClick={this.oneWeek}>1W</button>
                 <button onClick={this.oneMonth}>1M</button>
                 <button onClick={this.threeMonths}>3M</button>
                 <button onClick={this.sixMonths}>6M</button>
                 <button onClick={this.oneYear}>1Y</button>
                 <button onClick={this.fiveYears}>5Y</button>
                 <button onClick={this.max}>Max</button></div>
            <div> {this.state.apiDataLoaded ? this.renderChart() : <h1>Loading...</h1>} </div>
            {this.state.apiDataLoaded ? this.renderData() : <h1> </h1>}
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

export default ViewStock
