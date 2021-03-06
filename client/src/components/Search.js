import React, { Component }from 'react';
import Services from '../services';
import SearchResult from './SearchResult'
import { Redirect } from 'react-router'
import Header from './Header'
import Footer from './Footer'

class Search extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      ticker: null,
      unauth: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
  }

  handleInputChange(e) {
    let value = e.target.value;
    this.setState({
      ticker: value
    })
  }

  handleFormSubmit(e) {
    e.preventDefault();
    Services.search(this.state.ticker)
      .then(data => {
        this.setState({
          apiDataLoaded: true,
          apiData: data.data.data
        });
      })
      .catch(err => {
        console.log('error': err);
      })
  }


  renderSearch() {
    return this.state.apiData.map(stock => <SearchResult {...stock} key={stock.id}/>)
  }

  render() {
    return (
      <div>
        <Header />
        <h2 className="searchH1">Search by Company Name</h2>
        { this.state.unauth === false ?
        (<form className="searchForm" onSubmit={this.handleFormSubmit}>
          <input type='text' name='query' onChange={this.handleInputChange} placeholder='Enter Company Name' />
          <input type='submit' className="btn btn-xs portButt" value="Search"/>
        </form>) : <Redirect to="/"/>
      }
        { this.state.apiDataLoaded ? this.renderSearch() : '' }
      </div>
    )
  }
}

export default Search
