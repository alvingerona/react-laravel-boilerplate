export const initialState = {
  entities: {
    users: {},
    roles: [],
  },
  session: {
    currentUser: null
  },
  flashMessages: {},
  requests: {},
  page: {
    breadcrumb: []
  },
  notifications: {
    headNotifications: [],
    headUnreadCount: 0
  },
  misc: {
    default_ticket_create: {},
    overview: {
      open_tickets: 0,
      new_comments: 0
    }
  },
  ticket: {}
}
