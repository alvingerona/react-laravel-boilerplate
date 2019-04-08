import React from 'react'

import { linkStyle } from 'constants/styles'

export const AppFooter = props => (
  <footer className="app-footer">
    <div>
      Boilerplate + by{' '}
      <a
        className={linkStyle}
        target="_blank"
        href="https://github.com/alvingerona"
      >
        Alvin Gerona
      </a>
    </div>
  </footer>
)
