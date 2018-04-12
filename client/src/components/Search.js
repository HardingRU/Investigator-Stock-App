import React, { Component }from 'react';
import Services from '../services';
import SearchResult from './SearchResult'
import { Route, Redirect } from 'react-router'

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
    console.log(localStorage)
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
        console.log(data)

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
        { this.state.unauth === false ?
        (<form onSubmit={this.handleFormSubmit}>
          <input type='text' name='query' onChange={this.handleInputChange} placeholder='Enter Company Name' />
          <input type='submit' value="Search"/>
        </form>) : <Redirect to="/"/>
      }
        { this.state.apiDataLoaded ? this.renderSearch() : '' }
      </div>
    )
  }
}

export default Search
