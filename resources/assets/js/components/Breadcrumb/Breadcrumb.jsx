import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export const Breadcrumb = ({ items, mobileContent }) => {
  return (
    <Fragment>
      {mobileContent ? (
        <ol className="breadcrumb d-lg-none">
          <li className="breadcrumb-item">
            <span>{mobileContent}</span>
          </li>
        </ol>
      ) : null}

      <ol className="breadcrumb d-md-down-none">
        {items.map((item, i) => {
          let label = null
          let isActive = false

          if (item.to) {
            label = <Link to={item.to}>{item.label}</Link>
          } else {
            label = item.label
          }

          if (i + 1 == items.length) {
            isActive = true
            /**
             * When active, force to remove Link if available.
             */
            label = item.label
          }

          return (
            <li
              className={`breadcrumb-item ${isActive ? 'active' : ''}`}
              key={i}
            >
              {label}
            </li>
          )
        })}
      </ol>
    </Fragment>
  )
}
