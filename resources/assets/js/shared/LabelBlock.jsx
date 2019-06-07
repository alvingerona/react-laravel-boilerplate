import React, { Component, Fragment } from 'react'
import { Col } from './Col'

export const LabelBlock = ({
  label,
  component,
  sizes,
  colClassName,
  mt,
  mb,
  onClick
}) => {
  if (!colClassName) {
    colClassName = ''
  }

  if (!mb) {
    mb = 2
  }

  if (mt) {
    colClassName = colClassName + ` mt-${mt}`
  }

  if (mb) {
    colClassName = colClassName + ` mb-${mb}`
  }

  if (!sizes) {
    sizes = { md: 12 }
  }

  component = (
    <Fragment>
      <strong>{label}: </strong>
      {component}
    </Fragment>
  )

  if (onClick) {
    component = (
      <span onClick={onClick} className="cursor-pointer hover-panel-label">
        {component}
      </span>
    )
  }

  return (
    <Col {...sizes} className={colClassName}>
      {component}
    </Col>
  )
}
