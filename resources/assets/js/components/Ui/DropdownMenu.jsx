import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DropdownMenuComponent extends Component {
  constructor(props) {
    super(props)

    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    let { show, toggle } = this.props
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target) &&
      show &&
      toggle
    ) {
      toggle()
    }
  }

  render() {
    let { right, children, show } = this.props
    return (
      <div
        ref={this.setWrapperRef}
        className={`dropdown-menu ${right ? 'dropdown-menu-right' : ''} ${
          show ? 'show' : ''
        }`}
      >
        {children}
      </div>
    )
  }
}

export const DropdownMenu = DropdownMenuComponent
