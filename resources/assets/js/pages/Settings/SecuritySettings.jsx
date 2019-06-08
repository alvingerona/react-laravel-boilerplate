import React from 'react'
import { connect } from 'react-redux'
import { CardDash } from 'shared'
import { ChangePassword } from './Blocks'
import { setDashboardTitle, setBreadcrumb } from 'store/action-creators/page'

class SecurityComponent extends React.Component {
  componentDidMount(){
    this.props.setBreadcrumb();
  }
  
  render() {
    return (
      <CardDash xl={5} lg={6} md={6} title="Change Password">
        <ChangePassword />
      </CardDash>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({
  setDashboardTitle: title => setDashboardTitle(dispatch, title),
  setBreadcrumb: () => setBreadcrumb(dispatch, [
    {label: "Settings", to: '/'},
    {label: "Security Details", to: '/settings/security'},
  ])
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

export const SecuritySettings = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(SecurityComponent)
