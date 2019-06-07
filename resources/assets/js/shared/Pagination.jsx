import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

export const PaginationDynamic = class extends Component {
  render() {
    let { pagination, onPageLink } = this.props

    if (!pagination) {
      return null
    }

    let { total_pages, current_page } = pagination
    var items = []

    if (total_pages <= 1) {
      return null
    }

    for (var i = 1; i <= total_pages; i++) {
      items.push(i)
    }

    return (
      <Pagination>
        {current_page && current_page > 1 ? (
          <Fragment>
            <PaginationItem>
              <Link to={onPageLink({ page: 1 })}>
                <PaginationLink first tag="span" />
              </Link>
            </PaginationItem>

            <PaginationItem>
              <Link to={onPageLink({ page: current_page - 1 })}>
                <PaginationLink previous tag="span" />
              </Link>
            </PaginationItem>
          </Fragment>
        ) : null}

        {items.map((key, index) => {
          return (
            <PaginationItem key={index} disabled={current_page == key}>
              <Link to={onPageLink({ page: key })}>
                <PaginationLink tag="span">{key}</PaginationLink>
              </Link>
            </PaginationItem>
          )
        })}

        {current_page && current_page < total_pages ? (
          <Fragment>
            <PaginationItem>
              <Link to={onPageLink({ page: total_pages })}>
                <PaginationLink last tag="span" />
              </Link>
            </PaginationItem>

            <PaginationItem>
              <Link to={onPageLink({ page: current_page + 1 })}>
                <PaginationLink next tag="span" />
              </Link>
            </PaginationItem>
          </Fragment>
        ) : null}
      </Pagination>
    )
  }
}
