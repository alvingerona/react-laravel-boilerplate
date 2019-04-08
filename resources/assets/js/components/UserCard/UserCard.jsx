import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'

import { currentUserSelector } from 'store/selectors/session'
import defaultProfileImage from 'default-profile-picture.jpeg'

import {
  DropdownToggle,
  Collapse,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  NavbarUnlist,
  NavbarLink,
  NavItemDropdown,
  DropdownHeader
} from 'components/Ui'

export const UserCardComponent = class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    let { user, logOut } = this.props

    const { first_name: firstName, last_name: lastName, avatar } = user

    const fullName =
      lastName !== undefined ? [firstName, lastName].join(' ') : firstName

    return (
      <NavbarUnlist className="ml-auto">
        <NavbarLink
          to="#"
          iconClass="icon-bell"
          wrapperClass="d-md-down-none"
          badge={{ type: 'danger', content: 5 }}
        />

        <NavItemDropdown
          label={
            <img src={avatar || defaultProfileImage} className=" img-avatar" />
          }
          toggle={() => {}}
        >
          <DropdownHeader>{fullName}</DropdownHeader>
          <DropdownItem
            iconClass="fa fa-cog"
            to="/settings/user"
            label="Settings"
          />

          <div className="dropdown-divider mb-0" />

          <DropdownItem
            iconClass="fa fa-lock"
            label="Logout"
            role="button"
            onClick={logOut}
          />
        </NavItemDropdown>
      </NavbarUnlist>
    )
  }

  // renderx() {
  //   let { user, colorTheme, className = '', logOut } = this.props

  //   const { first_name: firstName, last_name: lastName, avatar } = user

  //   const fullName =
  //     lastName !== undefined ? [firstName, lastName].join(' ') : firstName

  //   const themeTextClass =
  //     colorTheme === 'dark' ? 'text-blue-darker' : 'text-white'

  //   return (
  //     <div className={`items-center ${className} ${themeTextClass}`}>
  //       <div className="text-sm">
  //         <Collapse isOpen={this.state.isOpen} navbar>
  //           <Nav className="ml-auto" navbar>
  //             <UncontrolledDropdown nav inNavbar>
  //               <DropdownToggle nav caret>
  //                 {fullName}
  //               </DropdownToggle>
  //               <DropdownMenu right>
  //                 <Link className="dropdown-item" to="/settings/user">
  //                   Settings
  //                 </Link>
  //                 <DropdownItem divider />
  //                 <DropdownItem onClick={logOut}>Log Out</DropdownItem>
  //               </DropdownMenu>
  //             </UncontrolledDropdown>

  //             <NavItem>
  //               <img
  //                 src={avatar || defaultProfileImage}
  //                 className="rounded w-25px mt-2"
  //               />
  //             </NavItem>
  //           </Nav>
  //         </Collapse>
  //       </div>
  //     </div>
  //   )
  // }
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
