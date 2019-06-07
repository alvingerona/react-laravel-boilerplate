import React from 'react'
import { objValueFromDot } from 'utility-functions'

export const Table = ({ className, children, striped, bordered }) => {
    let classNames = ['table table-hover']
  
    if (striped) {
      classNames.push('table-striped')
    }
  
    if (className) {
      classNames.push(className)
    }
  
    if (bordered) {
      classNames.push('table-bordered')
    }
  
    return <table className={classNames.join(' ')}>{children}</table>
  }

export const TableHead = ({ columns }) => {
    return (
        <thead className="thead-light">
        <tr>
            {columns.map((col, i) => {
            return (
                <th key={i} className={col.thClass}>
                {col.label}
                </th>
            )
            })}
        </tr>
        </thead>
    )
}

export const TableRow = ({ columns, data }) => {
    return (
        <tr>
        {columns.map((col, i) => {
            if (col.render) {
            return (
                <td key={i} className={col.tdClass}>
                {col.render(data)}
                </td>
            )
            } else if (col.component) {
            let CustomComponent = col.component
            return (
                <td key={i} className={col.tdClass}>
                <CustomComponent data={data} />
                </td>
            )
            }

            return <td key={i}>{objValueFromDot(data, col.key)}</td>
        })}
        </tr>
    )
}

export const TableRows = ({ columns, rows }) =>
    rows.map((data, i) => <TableRow data={data} columns={columns} key={i} />)