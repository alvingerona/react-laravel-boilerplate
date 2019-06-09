import React from 'react'
import { Link } from 'react-router-dom'
import {  } from 'reactstrap';
import { Nav, NavItem } from './Nav'

export const TabItem = ({children, active, ...rest}) => {

    return (
        <NavItem>
            <a className={active ? 'active' : ''}>{children}</a>
        </NavItem>
    );
}

export const TabBar = props => {

    return <Nav tabs {...props} />
}

export const Tab = ({tabs, active, ...rest}) => {
    return (<TabBar>{tabs.map((tab, i) => <TabItem key={i} active={tab.key === active}>{tab.content}</TabItem>)}</TabBar>);
}
