import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import {
  AppHeader,
  AppFooter,
  NavTabLinks,
  DashSidebar,
  Breadcrumb
} from '../../components'
import { Row } from '../../components/Ui'
import { setDashCurrentPath } from 'store/action-creators/page'
import './Dashboard.scss'

export const DashboardLayoutComponent = class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showSidebar: true,
      minSidebar: false
    }

    this.toggleShowSidebar = this.toggleShowSidebar.bind(this)
    this.toggleMinSidebar = this.toggleMinSidebar.bind(this)
  }

  _breadcrumb() {
    return {
      items: [{ label: 'DashBoard', to: '/' }],
      menu: []
    }
  }

  componentDidMount() {
    this.props.setDashCurrentPath(this.props.match.path)
  }

  componentWillReceiveProps(next) {
    let props = this.props

    if (props.match.path != next.match.path) {
      this.props.setDashCurrentPath(next.match.path)
    }
  }

  toggleMinSidebar() {
    this.setState({ minSidebar: !this.state.minSidebar })
  }

  toggleShowSidebar() {
    this.setState({ showSidebar: !this.state.showSidebar })
  }

  render() {
    let { children, dashTabs, dashTitle } = this.props
    let { showSidebar, minSidebar } = this.state
    let pageTabProps = {
      tabs: dashTabs,
      location: children.props.location
    }

    let sidebarProps = {
      toggleMinSidebar: this.toggleMinSidebar,
      minSidebar: minSidebar,
      match: this.props.match
    }

    let dashRightProps = {
      pageTabProps,
      children,
      breadcrumb: this._breadcrumb()
    }

    let headerProps = {
      toggleShowSidebar: this.toggleShowSidebar,
      dashTitle: dashTitle
    }

    return (
      <div
        className={`app header-fixed sidebar-fixed aside-menu-fixed ${
          showSidebar ? 'sidebar-lg-show' : ''
        } ${minSidebar ? 'brand-minimized sidebar-minimized' : ''} `}
      >
        <AppHeader {...headerProps} />
        <div styleName="dashboard-wrapper" className="app-body">
          <DashSidebar {...sidebarProps} />
          <DashRight {...dashRightProps} />
        </div>

        <AppFooter />
      </div>
    )
  }
}

const DashRight = ({ dashTitle, children, pageTabProps, breadcrumb }) => (
  <main styleName="dashboard-right" className="main">
    <Breadcrumb {...breadcrumb} />

    <NavTabLinks {...pageTabProps} />
    <div className="container-fluid">
      <div className="animated fadeIn">
        <Row>{children}</Row>
      </div>
    </div>
  </main>
)

const DashTitle = ({ title }) => {
  if (!title) {
    return null
  }

  return (
    <h2 className="mb-4" id="dashboard-title">
      {title}
    </h2>
  )
}

const mapStateToProps = state => {
  return {
    dashTabs: state.page.dashboardTabs,
    dashTitle: state.page.dashboardTitle,
    dashPath: state.page.dashboardPath
  }
}

const mapDispatchToProps = dispatch => ({
  setDashCurrentPath: path => setDashCurrentPath(dispatch, path)
})

export const DashboardLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardLayoutComponent)
