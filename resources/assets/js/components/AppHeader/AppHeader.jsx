import React from 'react'

import { Logo, UserCard } from 'components'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export const AppHeader = class extends React.Component{

	constructor(props) {
		super(props);

		this.state = {
			collapsed: false
		};
	}

	render(){
		let colorTheme = "dark";

		return (<div className="bg-blue-darker" id="header">


	      <Navbar color={colorTheme} dark={colorTheme == 'dark'} expand="md">
	      		<Logo />
	          <NavbarToggler onClick={this.toggle} />

	          <UserCard className="ml-auto" colorTheme={colorTheme} />


	          

	        </Navbar>
	  </div>)
	}

}