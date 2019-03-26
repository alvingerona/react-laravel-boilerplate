import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'

import { currentUserSelector } from 'store/selectors/session'
import defaultProfileImage from 'default-profile-picture.jpeg'

import { DropdownToggle, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownMenu, DropdownItem } from 'reactstrap';

export const UserCardComponent = class extends React.Component{
  
  constructor(props){
    super(props)

    this.state = {

    }
  }

  render(){

    let {
      user,
      colorTheme,
      className = '',
      logOut
    } = this.props;

    const { first_name: firstName, last_name: lastName, avatar } = user

    const fullName =
      lastName !== undefined ? [firstName, lastName].join(' ') : firstName

    const themeTextClass =
      colorTheme === 'dark' ? 'text-blue-darker' : 'text-white'

    return (
      <div className={`items-center ${className} ${themeTextClass}`}>
        <div className="text-sm">
        
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {fullName}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/settings/user">
                    Settings
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={logOut}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <NavItem>
                <img
                  src={avatar || defaultProfileImage}
                  className="rounded w-25px mt-2"
                />
              </NavItem>

            </Nav>
          </Collapse>
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  user: currentUserSelector(state)
})

const mapDispatchToProps = dispatch => ({
  logOut: async () => {
    await axios.get('/api/logout')
    dispatch(push('/login'))
  }
})

export const UserCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCardComponent)
