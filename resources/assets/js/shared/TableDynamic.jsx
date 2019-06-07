import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import {
  Table,
  TableHead,
  TableRows
} from './Table';
import { Col } from './Col';
export { PaginationDynamic } from './Pagination'
export { ProgressOverlay } from './ProgressOverlay'
export { Row } from './Row'

/**
 * column props sample:
// [
//     { label: 'Reporter', key: 'reporter.data.name', component: ColumnName },
//     {
//     label: 'Status',
//     key: 'subject',
//     thClass: 'text-center',
//     tdClass: 'text-center',
//     component: ColumnStatus
//     },
//     { label: 'Key', key: 'key' },
//     {
//     label: 'Subject',
//     key: 'subject'
//     },
//     {
//     label: 'Actions',
//     key: 'actions',
//     render: ticket => {
//         return (
//         <React.Fragment>
//             <ViewButton to={`/tickets/browse/${ticket.id}`} />{' '}
//             <DeleteButton
//             onClick={() => {
//                 this.setState({
//                 isDeleteModalOpen: true,
//                 ticketToDelete: ticket
//                 })
//             }}
//             />
//         </React.Fragment>
//         )
//     }
//     }
// ]
 */

class TableComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rows: [],
      pagination: null
    }
    this.props.onRef(this)

    this.loadRows = this.loadRows.bind(this);
  }

  componentDidMount(){
    this.loadRows(this.props);
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }  

  componentWillReceiveProps(next) {
    let props = this.props;

    if ( next.page != props.page) {
      this.loadRows({ page: next.page })
    }
  }

  loadRows(obj){
    let { page } = obj ? obj : {};
    let { loadRows } = this.props;

    if(!page){
        page = this.props.page;
    }

    this.setState({loading: true})
    loadRows({
        page: page,
        onCompleted: obj => {
            this.setState({
                loading: false,
                rows: obj.rows,
                pagination: obj.pagination
            })
        }
    });

  }

  render() {
    let { columns, onPageLink, components } = this.props
    let { rows, loading, pagination } = this.state;

    if (!components) {
      components = {}
    }

    if (!rows) {
      return null
    }

    let pageProps = {
      pagination,
      onPageLink
    }

    return (
      <Fragment>
        <Row>
          <Col md={6}>
            <PaginationDynamic {...pageProps} />
          </Col>

          <Col md={6}>{components.topRight}</Col>
        </Row>

        <Table striped className="border">
          <TableHead columns={columns} />
          <tbody>
            <TableRows rows={rows} columns={columns} />
          </tbody>
        </Table>

        <PaginationDynamic {...pageProps} />
        <ProgressOverlay show={loading} />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({

})

export const TableDynamic = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableComponent)