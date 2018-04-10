import React, { Component }from 'react';
import Services from '../services';
import SearchResult from './SearchResult'

class Search extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null
    }
  }

  componentDidMount() {
    console.log("mounted")
    Services.search("Apple")
      .then(data => {
        this.setState({
          apiDataLoaded: true,
          apiData: data.data.data
        });
        console.log(data)

      })
      .catch(err => {
        console.log('error': err);
      });
  }

  renderSearch() {
    return this.state.apiData.map(stock => <SearchResult {...stock} key={stock.id}/>)
  }

  render() {
    return (
      <div>
      {
        this.state.apiDataLoaded
        ? this.renderSearch()

        : <h1>Loading...</h1>
      }
      </div>
    )
  }
}

export default Search
