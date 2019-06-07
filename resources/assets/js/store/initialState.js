export const initialState = {
  entities: {
    users: {},
    roles: [],
    ticket_statuses: []
  },
  session: {
    currentUser: null
  },
  flashMessages: {},
  requests: {},
  page: {},
  notifications: {
    headNotifications: [],
    headUnreadCount: 0
  },
  project: {
    projects: []
  },
  priority_type: {
    priority_types: []
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
