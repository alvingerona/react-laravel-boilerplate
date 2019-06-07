import React, { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import { FormPageLayout, DashboardLayout } from 'layouts'
import { store, browserHistory } from 'store/create-store'
import { AuthGuard, FlashMessageRoot } from 'components'

const LogIn = lazy(() => import('pages/LogIn/LogIn'))
const SignUp = lazy(() => import('pages/SignUp/SignUp'))
const Overview = lazy(() => import('pages/Overview/Overview'))
const PasswordReset = lazy(() => import('pages/PasswordReset/PasswordReset'))
const ForgotPassword = lazy(() => import('pages/ForgotPassword/ForgotPassword'))
const NotFound = lazy(() => import('pages/NotFound/NotFound'))
const SettingsRoutes = lazy(() => import('pages/Settings/SettingsRoutes'))
const UsersRoutes = lazy(() => import('pages/Users/UsersRoutes'))
const TicketsRoutes = lazy(() => import('pages/Tickets/TicketsRoutes'))

const withDashboard = ContentComponent => {
  return props => (
    <AuthGuard>
      <DashboardLayout match={props.match}>
        <ContentComponent {...props} />
      </DashboardLayout>
    </AuthGuard>
  )
}

const Loading = () => (
  <div className="flex h-screen items-center">
    <div className="w-screen text-3xl text-center text-grey">Loading...</div>
  </div>
)

export const App = props => (
  <Provider store={store}>
    <Suspense fallback={<Loading />}>
      <FlashMessageRoot />
      <ConnectedRouter history={browserHistory}>
        <Switch>
          <Route
            exact
            path="/login"
            render={props => (
              <FormPageLayout md="6">
                <LogIn {...props} />
              </FormPageLayout>
            )}
          />
          <Route
            exact
            path="/signup"
            render={() => (
              <FormPageLayout md="6">
                <SignUp />
              </FormPageLayout>
            )}
          />
          <Route
            exact
            path="/forgot-password"
            render={() => (
              <FormPageLayout md="6">
                <ForgotPassword />
              </FormPageLayout>
            )}
          />
          <Route
            exact
            path="/reset-password/:resetToken"
            render={() => (
              <FormPageLayout title="Reset Password" md="6">
                <PasswordReset />
              </FormPageLayout>
            )}
          />

          {/* Dashboard routes */}
          <Route exact path="/" component={withDashboard(Overview)} />
          <Route path="/settings" component={withDashboard(SettingsRoutes)} />
          <Route path="/users" component={withDashboard(UsersRoutes)} />
          <Route path="/tickets" component={withDashboard(TicketsRoutes)} />
        
          {/* 404 route */}
          <Route path="*" exact={true} render={() => <NotFound />} />
        </Switch>
      </ConnectedRouter>
    </Suspense>
  </Provider>
)
