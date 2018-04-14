import React, { Component } from 'react';
import './App.css';
import Services from './services'
import { Redirect } from 'react-router'



class App extends Component {

  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      email: null,
      password: null
    }
    this.login = this.login.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  }

  login () {
    const request = {"auth": {"email": this.state.email, "password": this.state.password}}
    Services.login(request)
      .then(result => {
        localStorage.setItem("jwt", result.data.jwt)
        localStorage.setItem("email", this.state.email)
        this.setState({
          apiDataLoaded: true
        })
        console.log(result)
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleInputChange(e) {
    let value = e.target.value;
    if (e.target.name === "email") {
      this.setState({
        email: value
      })
    }
    else {
      this.setState({
        password: value
      })
    }
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
              type="email" onChange={this.handleInputChange}
            />
            <br /><br />
            <label htmlFor="password">Password:</label>
            <br />
            <input
              name="password"
              id="password"
              type="password" onChange={this.handleInputChange}
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
