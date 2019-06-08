import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from './Badge'

export const DropdownToggle = () => <div />

export const UncontrolledDropdown = () => <div />


export const DropdownItem = ({
    to,
    children,
    iconClass,
    badge,
    label,
    role,
    onClick
}) => {
    let props = {
        to: to ? to : '#',
        className: 'dropdown-item cursor-pointer',
        children: (
        <Fragment>
            {iconClass ? <i className={`${iconClass}`} /> : null}
            {children}
            {label}
            {badge ? (
            <Badge type={badge.type}>{badge.content}</Badge>
            ) : null}
        </Fragment>
        )
    }

    if(role == "span"){
        delete props.to;
        return <span {...props} />
    }else if (role == 'button') {
        props.onClick = onClick
        return <a {...props} />
    } else {
        return <Link {...props} />
    }
}

export const DropdownHeader = ({ children }) => (
    <div className="dropdown-header text-center">
      <strong>{children}</strong>
    </div>
  )