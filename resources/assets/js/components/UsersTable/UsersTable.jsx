import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import {
  ModalNotif,
  DeleteButton,
  EditButton,
  TableDynamic
} from 'shared'
import { flashMessage } from 'store/action-creators/flashMessages'

class UsersComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDeleteModalOpen: false,
      userToDelete: null
    }

    this.tableRef = null;
  }

  _columns() {
    return [
      { label: 'Name', key: 'name' },
      {
        label: 'Registration Date',
        key: 'created_at.a'
      },
      {
        label: 'Email',
        key: 'email'
      },
      {
        label: 'Role',
        key: 'role.label'
      },
      {
        label: 'Actions',
        key: 'actions',
        render: user => {
          return (
            <React.Fragment>
              <EditButton to={`/users/edit/${user.id}`} />{' '}
              <DeleteButton
                onClick={() => {
                  this.setState({ isDeleteModalOpen: true, userToDelete: user })
                }}
              />
            </React.Fragment>
          )
        }
      }
    ]
  }

  _findUserById(userId) {
    let { users } = this.props
    if (!users) {
      return null
    }

    return users.find(user => user.id == userId)
  }

  _deleteModalProps() {
    let { isDeleteModalOpen, userToDelete } = this.state
    let { onDelete } = this.props

    return {
      onCancel: () => this.setState({ isDeleteModalOpen: false }),
      toggle: () => this.setState({ isDeleteModalOpen: !isDeleteModalOpen }),
      isOpen: isDeleteModalOpen,
      user: userToDelete,
      title: 'Delete User',
      closeLabel: 'Cancel',
      buttons: {
        save: {
          label: 'Yes',
          type: 'danger',
          onClick: () => {
            onDelete({
              user: userToDelete,
              callback: () =>
                this.setState({ isDeleteModalOpen: true, userToDelete: null })
            })
          }
        }
      }
    }
  }

  render() {
    let { page, onLoad } = this.props
    let columns = this._columns();

    return (
      <Fragment>

        <TableDynamic 
          onRef={ref => (this.tableRef = ref)}
          page={page}
          columns={columns} 
          loadRows={onLoad}
          onPageLink={({ page }) => {
            return `/reports/users/${page}`
          }}
        />

        <DeleteModal {...this._deleteModalProps()} />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  onDelete: ({ user, callback }) => {
    dispatch(flashMessage('success', 'User successfully deleted!', 4000))
    callback()
  }
})

export const UsersTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersComponent)

export const DeleteModal = ({ user, ...rest }) => {
  if (!user) {
    return null
  }

  return (
    <ModalNotif {...rest}>
      Are you sure to delete user{' '}
      <strong>
        {user.name}(ID: {user.id})
      </strong>
      ?
    </ModalNotif>
  )
}
