import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { currentUserSelector } from 'store/selectors/session'
import defaultProfileImage from 'default-profile-picture.jpeg'
import { NavNotifDropdown } from 'components'
import {
  DropdownItem,
  NavbarUnlist,
  NavItemDropdown,
  DropdownHeader
} from 'shared'

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
        <NavNotifDropdown {...this.prop} />

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
