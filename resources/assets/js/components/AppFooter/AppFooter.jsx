import React from 'react'

import { linkStyle } from 'constants/styles'
import { appName, authorName, authorURL } from 'constants/general'

export const AppFooter = props => (
  <footer className="app-footer">
    <div>
      {appName} by{' '}
      <a className={linkStyle} target="_blank" href={authorURL}>
        {authorName}
      </a>
    </div>
  </footer>
)
