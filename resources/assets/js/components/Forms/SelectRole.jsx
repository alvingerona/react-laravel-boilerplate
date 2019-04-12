import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadRoles } from 'store/action-creators/role'
import { SelectInput } from 'components'

class SelectRoleComponent extends Component {
  componentDidMount() {
    this.props.loadRoles()
  }

  _option(role) {
    if (!role.name) {
      return { value: null, label: null }
    }

    return {
      value: role.id,
      label: role.name.charAt(0).toUpperCase() + role.name.slice(1)
    }
  }

  render() {
    let { roles, loadRoles, ...rest } = this.props

    return <SelectInput {...rest} options={roles.map(this._option)} />
  }
}

SelectRoleComponent.propTypes = {
  // prop: PropTypes
}

const mapStateToProps = state => {
  return {
    roles: state.entities.roles
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadRoles: () => loadRoles(dispatch)
  }
}

export const SelectRole = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectRoleComponent)
