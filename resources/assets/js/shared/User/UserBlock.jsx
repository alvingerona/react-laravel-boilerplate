import React, { Component, Fragment } from 'react'

export const UserBlock = class extends Component {
  render() {
    let { user } = this.props

    return (
      <Fragment>
        {user.name} ({user.email})
      </Fragment>
    )
  }
}
