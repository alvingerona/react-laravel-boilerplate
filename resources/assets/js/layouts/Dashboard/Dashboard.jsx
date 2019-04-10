import React from 'react'
import { connect } from 'react-redux'

import {
  DashHeader,
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
      minSidebar: false,
      showMobileSidebar: false
    }

    this.toggleShowSidebar = this.toggleShowSidebar.bind(this)
    /**
     * callback when .sidebar-minimizer is closed.
     */
    this.toggleMinSidebar = this.toggleMinSidebar.bind(this)
    this.toogleMobileSidebar = this.toogleMobileSidebar.bind(this)
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

  toogleMobileSidebar() {
    this.setState({ showMobileSidebar: !this.state.showMobileSidebar })
  }

  render() {
    let { children, dashTabs, dashTitle } = this.props
    let { showSidebar, minSidebar, showMobileSidebar } = this.state
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
      breadcrumb: this._breadcrumb(),
      dashTitle: dashTitle
    }

    let headerProps = {
      toggleShowSidebar: this.toggleShowSidebar,
      toogleMobileSidebar: this.toogleMobileSidebar,
      dashTitle: dashTitle
    }

    let appClasses = ['app header-fixed sidebar-fixed aside-menu-fixed']

    if (showMobileSidebar) {
      appClasses.push('sidebar-show')
    }

    if (showSidebar) {
      appClasses.push('sidebar-lg-show')
    }

    if (minSidebar) {
      appClasses.push('brand-minimized sidebar-minimized')
    }

    return (
      <div className={appClasses.join(' ')}>
        <DashHeader {...headerProps} />
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
    <Breadcrumb {...breadcrumb} mobileContent={<strong>{dashTitle}</strong>} />

    <NavTabLinks {...pageTabProps} />
    <div className="container-fluid">
      <div className="animated fadeIn">
        <Row>{children}</Row>
      </div>
    </div>
  </main>
)

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
