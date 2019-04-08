import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { SubmissionError } from 'redux-form'

import { logIn } from 'store/action-creators/session'
import { CardGroup, Card, CardBody, Button } from '../../components/Ui'
import LogInForm from './LogInForm'

export const LogInComponent = props => {
  const { attemptLogin } = props

  return (
    <CardGroup>
      <LoginBlock attemptLogin={attemptLogin} />
      <SignupBlock />
    </CardGroup>
  )
}

const LoginBlock = ({ attemptLogin }) => (
  <Card withBody className="p-4">
    <h1>Login</h1>
    <p className="text-muted">Sign In to your account</p>
    <LogInForm onSubmit={attemptLogin} />
  </Card>
)

const SignupBlock = () => (
  <Card className="text-white bg-primary py-5 d-md-down-none">
    <CardBody className="text-center">
      <div>
        <h2>Sign up</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <Button type="primary" className="active mt-3" to="/signup">
          Register Now!
        </Button>
      </div>
    </CardBody>
  </Card>
)

const parseValidationFromResponse = response => {
  let errors = {}
  if (
    response.errors === true &&
    response.message === 'Incorrect login details'
  ) {
    errors.email = 'Incorrect login details'
  }

  return errors
}

const mapDispatchToProps = dispatch => ({
  attemptLogin: async loginDetails => {
    try {
      await dispatch(logIn(loginDetails))
      dispatch(push('/'))
    } catch (error) {
      throw new SubmissionError(
        parseValidationFromResponse(error.response.data)
      )
    }
  }
})

export default connect(
  null,
  mapDispatchToProps
)(LogInComponent)
