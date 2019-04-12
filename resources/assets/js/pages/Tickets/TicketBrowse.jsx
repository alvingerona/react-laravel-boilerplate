import React from 'react'
import { connect } from 'react-redux'

class PageComponent extends React.Component {
  componentDidMount() {
    this.props.setDashboardTitle('PAGE TITLE HERE')
  }

  render() {
    return (
      <CardDash md={12} title="CARD TITLE HERE">
        BROWSE HERE
      </CardDash>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({
  setDashboardTitle: title => setDashboardTitle(dispatch, title)
})

export const TicketBrowse = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageComponent)
