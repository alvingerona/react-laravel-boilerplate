import React from 'react'
import { connect } from 'react-redux'

import './ScreenPreloader.scss'

export class Comp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { isShowPreloader } = this.props

    if (!isShowPreloader) {
      return null
    }

    return (
      <div styleName="screen-preloader" className="screen-preloader">
        <div className="progress">
          <div
            styleName="progress-bar"
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
          ></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isShowPreloader: state.screen.isShowPreloader
  }
}

const mapDispatchToProps = dispatch => ({})

export const ScreenPreloader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Comp)
