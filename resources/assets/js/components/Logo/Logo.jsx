import React from 'react'

import { NavbarBrand } from 'shared'
import { appName, appNameShort } from 'constants/general'

// import './Logo.scss'

export const Logo = props => (
  <NavbarBrand to="/" full={appName} min={appNameShort} />
)
