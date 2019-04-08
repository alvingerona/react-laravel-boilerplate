import React, { Component } from 'react'
import { connect } from 'react-redux'

import { NeutralButton } from 'components'
import { ModalConsumer } from 'contexts'

import { setDashboard } from 'store/action-creators/page'

const ModalExample = props => <div>{props.message}</div>

const OverviewComponent = class extends Component {
  componentDidMount() {
    this.props.setDashboard({
      title: 'Dashboard'
    })
  }

  render() {
    {
      return <div>New ticket block. </div>
    }
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({
  setDashboard: opts => setDashboard(dispatch, opts)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewComponent)
