import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ColComponent extends Component {
  constructor(props) {
    super(props)
  }

  /**
   * Generate string for className
   */
  _extractPropsForClass() {
    let classNames = []
    let sizesPropKeys = ['xl', 'md', 'lg', 'sm', 'xs']
    let offsetPropKeys = [
      'xlOffset',
      'mdOffset',
      'lgOffset',
      'smOffset',
      'xsOffset'
    ]

    sizesPropKeys.forEach(key => {
      if (typeof this.props[key] != undefined) {
        if (typeof this.props[key] == 'object') {
          classNames.push(col)
          classNames.push(this._offsetClass(key, this.props[key].offset))
        } else {
          classNames.push(this._colClass(key, this.props[key]))
        }
      }
    })

    offsetPropKeys.forEach(key => {
      if (
        typeof this.props[key] != undefined ||
        typeof this.props[key] != 'undefined'
      ) {
        classNames.push(
          this._offsetClass(key.replace(/Offset/g), this.props[key])
        )
      }
    })

    if (this.props.col) {
      classNames.push('col-' + this.props.col)
    }

    return classNames.join(' ')
  }

  _offsetClass(screen, size) {
    if (typeof size == undefined || typeof size == 'undefined') {
      return ''
    }

    console.log(size)

    return `offset-${screen}-${size}`
  }

  _colClass(screen, size) {
    if (typeof size == undefined || typeof size == 'undefined') {
      return ''
    }

    return `col-${screen}-${size}`
  }

  render() {
    let { className, children } = this.props
    let classNames = []

    if (className) {
      classNames.push(className)
    }

    classNames.push(this._extractPropsForClass())

    return <div className={classNames.join(' ')}>{children}</div>
  }
}

ColComponent.prototypes = {
  col: PropTypes.number,
  children: PropTypes.any,
  className: PropTypes.string,
  xlOffset: PropTypes.any,
  mdOffset: PropTypes.any,
  lgOffset: PropTypes.any,
  smOffset: PropTypes.any,
  xsOffset: PropTypes.any,
  xl: PropTypes.any,
  md: PropTypes.any,
  lg: PropTypes.any,
  sm: PropTypes.any,
  xs: PropTypes.any
}

export const Col = ColComponent
