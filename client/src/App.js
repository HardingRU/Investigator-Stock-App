import React, { Component } from 'react';
import './App.css';
import Services from './services'
import { Route, Redirect } from 'react-router'



class App extends Component {

  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
    }
    this.login = this.login.bind(this);
  }

  login () {
    const email = "5"
    const password = "5"
    const request = {"auth": {"email": email, "password": password}}
    console.log(request)
    Services.login(request)
      .then(result => {
        localStorage.setItem("jwt", result.data.jwt)
        this.setState({
          apiDataLoaded: true
        })
        console.log(result)
      })
      .catch(err => {
        console.log('error': err);
      })
  }

  render() {
    if(this.state.apiDataLoaded === false) {
      return (
        <div className="App">
          <h1 style={{marginTop: "20vh", marginBottom: "5vh"}}>
            Investigator
          </h1>
          <form>
            <label htmlFor="email">Email: </label>
            <br />
            <input name="email" id="email"
              type="email"
            />
            <br /><br />
            <label htmlFor="password">Password:</label>
            <br />
            <input
              name="password"
              id="password"
              type="password"
            />
            </form>
            <br />
            <button
              onClick={this.login}
            >
                Login
            </button>
          <br/>
          <div>Not signed up? <a href="/register">Click here</a> to register</div>
        </div>
      )
    }
    else {
      return (
        <Redirect to="/portfolio"/>
      )
    }
  }
}

export default App;
