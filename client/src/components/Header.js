//LetsGetit

import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {NavDropdown, MenuItem, Navbar, NavItem, Nav} from 'react-bootstrap';
import '../App.css';


class Header extends Component {
	constructor() {
		super()
		this.state = {
			fireRedirect: false
		}
		this.handleButtonClick = this.handleButtonClick.bind(this)
	}

	handleButtonClick() {
		localStorage.clear();
		this.setState({
			fireRedirect: true
		})
	}

	render(){
		return (
			<div>
				<Navbar inverse collapseOnSelect>
					<Navbar.Header>

						<Navbar.Brand>
						  	<a href="/portfolio"><img className="logo" src="https://cdn.pixabay.com/photo/2012/04/30/10/13/alligator-44624_960_720.png" width="120" height="60"/></a>
							</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav>
							<NavItem className="navItem" eventKey={1} href="\portfolio">View Portfolio</NavItem>
							<NavItem className="navItem" eventKey={2} href="\search">Search</NavItem>
							<NavItem className="navItem" eventKey={3} onClick={this.handleButtonClick}>Logout</NavItem>
							{this.state.fireRedirect ? <Redirect to='/' /> : ''}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		)
	}
}

export default Header
