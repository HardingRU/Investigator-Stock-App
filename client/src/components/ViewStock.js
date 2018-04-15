
import React, { Component }from 'react';
import Services from '../services';
import {Line} from 'react-chartjs-2';
import { Redirect } from 'react-router';
import ReactTable from 'react-table'
import Header from './Header'
import Footer from './Footer'

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
      exportData: null,
      addTriggered: false,
      owned: false
    }
    this.storeData = this.storeData.bind(this);
    this.renderChart = this.renderChart.bind(this);
    this.renderData = this.renderData.bind(this);
    this.addStock = this.addStock.bind(this);
    this.editStock = this.addStock.bind(this);
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
    this.setState({
      addTriggered: true
    })
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
    Services.checkOwned(this.props.match.params.ticker, localStorage.email)
      .then(response => {
        if(response.data.data != null) {
          this.setState({
            owned: true
          })
        }
      })
      .then(err => {
        console.log(err)
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
              text: this.state.ticker + " Closing Stock Price",
              fontSize: 18,
              fontColor: '#222'
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: false
            },
            layout: {
              padding: 20
            },
            scales: {
              xAxes: [{
                ticks: {
                  fontColor: "#222", // this here
                },
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                }
              }],
              yAxes: [{
                ticks: {
                  fontColor: "#222", // this here
                },
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                }
              }],
}
          }}
        />
      </div>
    )
  }


  renderData() {

    const data = []
    for (let i =0; i < this.state.apiData.length; i++) {
      let temp = {}
      temp.date = this.state.apiData[i][0]
      temp.open = this.state.apiData[i][8]
      temp.high = this.state.apiData[i][9]
      temp.low = this.state.apiData[i][10]
      temp.close = this.state.apiData[i][11]
      data.push(temp)
    }
    const columns = [{Header: 'Date', accessor: 'date'},{Header: 'Open', accessor: 'open'}, {Header: 'High', accessor: 'high'}, {Header: 'Low', accessor: 'low'}, {Header: "Close", accessor: 'close'}]
    // var rowList = []
    // rowList.push(<tbody className="tableData"><tr><th>Date</th><th>Open</th><th>High</th><th>Low</th><th>Close</th></tr></tbody>)
    // console.log("rowList", rowList)
    // for (let i = 0; i < this.state.apiData.length; i++) {
    //   rowList.push(<tr className="row" key={i}><td>{this.state.apiData[i][0]}</td><td>{this.state.apiData[i][8]}</td><td>{this.state.apiData[i][9]}</td><td>{this.state.apiData[i][10]}</td><td>{this.state.apiData[i][11]}</td></tr>);
    // }
    // return rowList;
    console.log("data to chart", data)
    return (
      <ReactTable data={data} columns={columns}/>
    )
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
    this.setState({
      chartData: tempChart,
    })
  }


  render() {
      if(this.state.addTriggered === false) {
        if(this.state.unauth === false) {
          return (
            <div>
              <Header />
              <div className="chartButtons"> {this.state.owned
                    ? <button name={this.props.match.params.ticker} onClick={this.editStock}>Edit Holdings</button>
                    : <button name={this.props.match.params.ticker} onClick={this.addStock}>Add to Portfolio</button>}</div>

              <div> {this.state.apiDataLoaded ? this.renderChart() : <h1>Loading...</h1>} </div>

              <div className="chartButtons">
                {this.state.apiDataLoaded ?
                <div>
                  <button className="chartButton" onClick={this.oneWeek}>1W</button>
                   <button className="chartButton" onClick={this.oneMonth}>1M</button>
                   <button className="chartButton" onClick={this.threeMonths}>3M</button>
                   <button className="chartButton" onClick={this.sixMonths}>6M</button>
                   <button className="chartButton" onClick={this.oneYear}>1Y</button>
                   <button className="chartButton" onClick={this.fiveYears}>5Y</button>
                   <button className="chartButton" onClick={this.max}>Max</button>
                 </div> : <h1></h1>}
              </div>
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
      else {
        if(this.state.owned === false) {
          return (
            <Redirect to={`/add/${this.props.match.params.ticker}`}/>
          )
        }
        else {
          return (
            <Redirect to={`/edit/${this.props.match.params.ticker}`}/>
          )
        }

      }

    }



}

export default ViewStock
