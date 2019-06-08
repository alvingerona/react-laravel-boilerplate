import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ButtonGroup } from 'shared'

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
          let itemClass = `breadcrumb-item ${isActive ? 'active' : ''}`;

          if (i + 1 == items.length) {
            isActive = true
            /**
             * When active, force to remove Link if available.
             */
            label = item.label
          }

          if(item.type == "menu"){
            itemClass = "breadcrumb-menu d-md-down-none"
          }

          return (
            <li
              className={itemClass}
              key={i}
            >
              {item.type && item.type == "menu" ? <MenuItem item={item} /> : <SimpleItem item={item} /> }
              {label}
            </li>
          )
        })}
      </ol>
    </Fragment>
  )
}

const SimpleItem = ({item, ...rest}) => {
  let label = null

  if (item.to) {
    label = <Link to={item.to} className="text-body">{item.label}</Link>
  } else {
    label = item.label
  }

  return label;
}

const MenuItem = ({item, ...rest}) => {

  return <ButtonGroup items={item.items} />
}