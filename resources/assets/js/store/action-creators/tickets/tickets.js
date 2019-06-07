import { ticketActions } from '../../actions'
import { actionHttp } from '../../../utilities'

export const loadTickets = (dispatch, filters, callback, opts) => {
  if (!opts) {
    opts = {}
  }

  let action = new actionHttp()
    .setDispatch(dispatch)
    .onSuccess(resp => {
      callback(resp.data.data)
    })
    .onError(resp => {
      console.log(resp)
    })

  if (!opts.isLazyLoad) {
    return action.get('load-roles', '/api/tickets', filters)
  }

  return action.lazyGet('load-roles', '/api/tickets', filters)
}

export const loadTicket = (dispatch, id, onSuccess) => {
  return new actionHttp()
    .setDispatch(dispatch)
    .onSuccess(resp => {
      onSuccess(resp.data.data)
    })
    .onError(resp => {
      console.log(resp)
    })
    .get('load-roles', `/api/tickets/${id}`)
}

export const loadStatuses = (dispatch, onSuccess) => {
  return new actionHttp()
    .setDispatch(dispatch)
    .onSuccess(resp => {
      dispatch({
        type: ticketActions.STATUSES,
        data: resp.data.data.data
      })

      if (onSuccess) {
        onSuccess(resp.data.data)
      }
    })
    .onError(resp => {
      console.log(resp)
    })
    .get('load-roles', '/api/ticket-status')
}

export const storeTicket = (dispatch, field, onSuccess) => {
  return new actionHttp()
    .setDispatch(dispatch)
    .onSuccess(resp => onSuccess(resp))
    .setSuccessMessage('Ticket has been created!')
    .onError(resp => {
      console.log(resp)
    })
    .post('store-ticket', '/api/tickets', field)
}

export const storeComment = (dispatch, fields, onSuccess, onComplete) => {
  return new actionHttp()
    .setDispatch(dispatch)
    .setSuccessMessage('Comment has been created!')
    .onSuccess(resp => {
      onComplete()
      onSuccess(resp)
    })
    .onError(resp => {
      onComplete()
    })
    .post('store-comment', `/api/tickets/${fields.ticket_id}/comments`, fields)
}

export const ticketComments = (dispatch, ticketId, callback) => {
  return new actionHttp()
    .setDispatch(dispatch)
    .onSuccess(resp => {
      callback(resp)
    })
    .onError(resp => {
      console.log(resp)
    })
    .get('load-roles', `/api/tickets/${ticketId}/comments`)
}

export const ticketsLatestComments = (dispatch, { onComplete, onSuccess }) => {
  return new actionHttp()
    .setDispatch(dispatch)
    .onSuccess(resp => {
      onComplete();
      onSuccess(resp);
    })
    .onError(resp => {
      console.log(resp)
      onComplete();
    })
    .get('load-roles', `/api/comments/latest`)
}

export const deleteComment = (
  dispatch,
  ticketId,
  commentId,
  onComplete,
  onSuccess
) => {
  return new actionHttp()
    .setDispatch(dispatch)
    .setSuccessMessage('Comment has been deleted!')
    .onSuccess(resp => {
      onComplete()
      onSuccess()
    })
    .onError(resp => {
      onComplete()
      console.log(resp)
    })
    .delete('delete-comment', `/api/tickets/${ticketId}/comments/${commentId}`)
}

export const updateComment = (dispatch, fields, onSuccess, onComplete) => {
  return new actionHttp()
    .setDispatch(dispatch)
    .setSuccessMessage('Comment has been updated!')
    .onSuccess(resp => {
      onComplete()
      onSuccess(resp)
    })
    .onError(resp => {
      onComplete()
    })
    .put(
      'store-comment',
      `/api/tickets/${fields.ticket_id}/comments/${fields.comment_id}`,
      fields
    )
}

export const updateTicketStatus = (dispatch, fields, onSuccess, onComplete) => {
  return new actionHttp()
    .setDispatch(dispatch)
    .setSuccessMessage('Status has been updated!')
    .onSuccess(resp => {
      onComplete()
      onSuccess(resp)
    })
    .onError(resp => {
      onComplete()
    })
    .post(
      'ticket-status-update',
      `/api/tickets/${fields.ticket_id}/status-update`,
      fields
    )
}

export const updateTicket = (dispatch, field, id, onComplete, onSuccess) => {
  return new actionHttp()
    .setDispatch(dispatch)
    .onSuccess(resp => {
      onComplete()
      onSuccess(resp)
    })
    .setSuccessMessage('Ticket has been updated!')
    .onError(resp => {
      onComplete()
    })
    .put('store-ticket', `/api/tickets/${id}`, field)
}

export const generateReport = (dispatch, {fields, onComplete, onSuccess }) => {

  return new actionHttp()
    .setDispatch(dispatch)
    .onSuccess(resp => {
      onComplete()
      onSuccess(resp.data.url)
    })
    .onError(resp => {
      onComplete()
    })
    .get('report-ticket', `/api/tickets/generate-report`, fields)  

}