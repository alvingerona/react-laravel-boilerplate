const roleClient = 'employee'
const roleSupport = 'support'
const roleAdmin = 'admin'

class userClass {
  constructor(obj) {
    this.user = obj
  }

  role() {
    if (!this.user) {
      return null
    }

    if (!this.user.role) {
      return null
    }

    return this.user.role
  }

  isRoleClient() {
    let role = this.role()

    if (!role) {
      return false
    }

    return role.name == roleClient
  }

  isRoleSupport() {
    let role = this.role()

    if (!role) {
      return false
    }

    return role.name == roleSupport
  }

  isRoleAdmin() {
    let role = this.role()

    if (!role) {
      return false
    }

    return role.name == roleAdmin
  }

  can(key) {
    return !!this.permissions().find(perm => {
      return perm == key
    })
  }

  permissions() {
    if (!this.user) {
      return []
    }

    return this.user.permissions
  }
}

export const user = userClass
