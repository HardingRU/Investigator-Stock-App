import React, { Component } from 'react';
import Services from '../services'
import { Link } from 'react-router-dom'
import { Route, Redirect } from 'react-router'


  class Register extends Component {
    constructor() {
      super();
      this.state = {
        apiDataLoaded: false,
      }
      this.register = this.register.bind(this);
    }

  register () {
    const email = "12"
    const password = "12"
    const info = {"email": email, "password": password}
    //console.log(request)
    Services.register(info)
      .then(result => {
        this.setState({
          apiDataLoaded: true
        })
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
            Investigator - Account Registration
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
              onClick={this.register}
            >
                Register
            </button>
          <br/>
          <div>Have an account? <a href="/">Click here</a> to login</div>
        </div>
      )
    }
    else {
      return (
        <Redirect to="/login"/>
      )
    }
  }
}

export default Register;
