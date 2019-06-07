import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import { PositiveButton, TextFormRow } from 'shared'
import { PictureUpload } from 'components'
import { email as emailRegex } from 'constants/regexes'

export class UserSettingsFormComponent extends React.Component {
  render() {
    const { handleSubmit, avatarUploadHandler, className } = this.props

    return (
      <form className={className} onSubmit={handleSubmit}>
        <Field
          name="avatar"
          component={PictureUpload}
          uploadHandler={avatarUploadHandler}
          className="mr-10"
        />
        <Field
          name="first_name"
          component={TextFormRow}
          labelText="First Name"
        />
        <Field name="last_name" component={TextFormRow} labelText="Last Name" />
        <Field name="email" component={TextFormRow} labelText="Email" />

        <div className="flex border-grey-light">
          <PositiveButton type="submit" className="ml-auto">
            Save User Details
          </PositiveButton>
        </div>
      </form>
    )
  }
}

const validateUserSettings = values => {
  let errors = {}

  if (!values.first_name) {
    errors.first_name = 'This field is required'
  }

  if (!values.last_name) {
    errors.last_name = 'This field is required'
  }

  if (!values.email) {
    errors.email = 'This field is required'
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

const Form = reduxForm({
  form: 'accountSettings',
  enableReinitialize: true,
  validate: validateUserSettings
})(UserSettingsFormComponent)

const mapStateToProps = state => {
  const {
    session: { currentUser }
  } = state
  return {
    initialValues: state.entities.users[currentUser]
  }
}

export const UserSettingsForm = connect(
  mapStateToProps,
  null
)(Form)
