import React, { Component, Fragment } from 'react'
import {
  Modal as ModalRS,
  ModalHeader as ModalHeaderRS,
  ModalBody as ModalBodyRS,
  ModalFooter as ModalFooterRS
} from 'reactstrap'
import PropTypes from 'prop-types'

import { Button } from './Button'

export const Modal = ({ ...rest }) => <ModalRS {...rest} />

export const ModalHead = props => <ModalHeaderRS {...props} />

export const ModalBody = props => <ModalBodyRS {...props} />

export const ModalFooter = props => <ModalFooterRS {...props} />

export const ModalNotif = class extends Component {
  _buttons() {
    let { onCancel, buttons, closeLabel } = this.props

    if (!buttons) {
      buttons = {}
    }

    let defaultBtns = {
      close: {
        label: closeLabel ? closeLabel : 'Close',
        onClick: onCancel,
        type: 'secondary'
      }
    }

    let allBtns = { ...defaultBtns, ...buttons }

    return Object.keys(allBtns).map((k, i) => {
      let { onClick, to, type, label, ...btnProps } = allBtns[k]

      return (
        <Button onClick={onClick} type={type} to={to} key={i} {...btnProps}>
          {label}
        </Button>
      )
    })
  }

  render() {
    let { title, children, isOpen, toggle, onCancel, ...rest } = this.props

    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHead toggle={toggle}>{title}</ModalHead>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>{this._buttons()}</ModalFooter>
      </Modal>
    )
  }
}

ModalNotif.propTypes = {
  /**
   * @var buttons
   * sample value:
   * buttons: {
   *    save: {
   *        label: 'Okay',
   *        type: 'primary',
   *        onClick: () => {
   *            ...so something here
   *        }
   *    }
   * }
   */
  buttons: PropTypes.object
}
