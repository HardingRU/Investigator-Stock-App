import React, { Component }from 'react';
import Services from '../services';
import SearchResult from './SearchResult'
import { Redirect } from 'react-router'

class HelpDirect extends Component {
  constructor() {
    super();
    this.state = {
      unauth: false
    }
  }

  componentDidMount() {
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


  render() {
    return (
      <div>
        { this.state.unauth === false
          ? <Redirect to="/portfolio"/>
          : <Redirect to="/"/>
        }
      </div>
    )
  }
}

export default HelpDirect
