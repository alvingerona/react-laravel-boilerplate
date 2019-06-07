import React, { Component } from 'react'

import { Card, CardBody, CardFooter } from './Card'
import { Link } from 'react-router-dom'

const WidgetComponent = class extends Component {

    render(){

        let { iconClass, title, viewLabel, viewPath } = this.props;

        return <Card>

            <CardBody className="p-3 d-flex align-items-center">
                <i className={`bg-primary p-3 font-2xl mr-3 ${iconClass}`} />
                <div>
                    <div className="text-value-sm text-primary">{title}</div>
                        <div className="text-muted text-uppercase font-weight-bold small">
                        Open Tickets
                    </div>
                </div>

            </CardBody>

            <CardFooter className="px-3 py-2">
                <Link
                className="btn-block text-muted d-flex justify-content-between align-items-center"
                to={viewPath}>
                    <span className="small font-weight-bold">{viewLabel}</span>
                    <i className="fa fa-angle-right" />
                </Link>
            </CardFooter>
        </Card>
    }
}

export const Widget = WidgetComponent