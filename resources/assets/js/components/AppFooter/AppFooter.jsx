import React from 'react'

import { linkStyle } from 'constants/styles'

export const AppFooter = props => (
  <p className="text-left text-sm text-grey p-2">
    Laravel + React Boilerplate by{' '}
    <a
      className={linkStyle}
      target="_blank"
      href="https://github.com/alvingerona"
    >
      Alvin Gerona
    </a>
  </p>
)
