import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import {
  SaveButton,
  TextFormRow,
  EditorFormRow,
  SelectFormRow,
  Form as FormUi, 
  Col, 
  Row, 
  CardDash 
} from 'shared'
import { user } from 'utilities'

/**
 * TODO:
 * - When project is changed make sure to null the value of category.
 */
export class FormComponent extends React.Component {
  _formValues() {
    const { formValues } = this.props

    if (!formValues) {
      return {}
    }

    return formValues
  }

  _statuses() {
    let { statuses } = this.props
    let flatStatuses = []

    statuses.forEach(s => {
      flatStatuses.push(s)

      if (s.children) {
        s.children.data.forEach(ss => {
          flatStatuses.push(ss)
        })
      }
    })

    return flatStatuses
  }

  _isDuplicate() {
    let formValues = this._formValues()
    let statuses = this._statuses()
    let status = statuses.find(s => {
      return s.id == formValues.status
    })

    if (!status) {
      return null
    }

    return status.slug == 'fixed.duplicate'
  }

  render() {
    let { handleSubmit, submitting, isEdit, currentUser } = this.props
    let formValues = this._formValues()
    let labelSize = {
      md: 3,
      lg: 2
    }

    let usr = new user(currentUser)
    let canManagAssign = usr.can('can.manage.ticket.assignee')

    return (
      <Col md={12}>
        <FormUi onSubmit={handleSubmit} loading={submitting}>
          <Row>
            <CardDash md={8} title="Basic Information">
          
              <Field
                name="subject"
                required
                component={TextFormRow}
                labelText="Subject"
                fieldSize={{ md: 7 }}
                labelSize={labelSize}
              />

              {canManagAssign ? (
                <Field
                  name="assignee"
                  component={SelectAssigneeFormRow}
                  labelText="Assignee"
                  fieldSize={{ md: 4 }}
                  labelSize={labelSize}
                />
              ) : null}

              <Field
                name="description"
                required
                component={EditorFormRow}
                labelText="Description"
                fieldSize={{ md: 7 }}
                labelSize={labelSize}
              />

            </CardDash>

            <CardDash
              md={4}
              title="Project Information"
              footer={
                <Fragment>
                  <SaveButton type="submit" submit>
                    Save Ticket
                  </SaveButton>
                </Fragment>
              }
            >
              {isEdit ? (
                <Field
                  name="is_faq"
                  required
                  component={SelectYesNo}
                  labelText="Allow in FAQ"
                  fieldSize={{ md: 12 }}
                  labelSize={{ md: 12 }}
                  projectId={formValues.is_faq}
                />
              ) : null}
            </CardDash>
          </Row>
        </FormUi>
      </Col>
    )
  }
}

const validate = values => {
  let errors = {}

  let requiredFields = ['subject', 'description', 'project', 'category']

  requiredFields.forEach(name => {
    if (!values[name] || values[name] == '') {
      errors[name] = 'This field is required'
    }
  })

  return errors
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = values => {
  return sleep(100).then(() => {
    console.log({ 'onChange Project': values })
  })
}

const Form = reduxForm({
  form: 'ticket',
  enableReinitialize: true,
  validate: validate,
  asyncValidate,
  asyncChangeFields: ['project']
})(FormComponent)

const mapStateToProps = state => {
  let {
    form: { ticket }
  } = state

  return {
    formValues: ticket ? ticket.values : {},
    statuses: state.entities.ticket_statuses,
    currentUser: state.entities.users[state.session.currentUser]
  }
}

const mapDispatchToProps = dispatch => ({})

export const TicketForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)

const SelectYesNo = props => {
  let options = [{ label: 'Yes', value: 1 }, { label: 'No', value: 0 }]

  return <SelectFormRow {...props} options={options} />
}
