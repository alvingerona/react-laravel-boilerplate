import React from 'react'

import { NavbarBrand } from '../Ui'
import { appName, appNameShort } from 'constants/general'

// import './Logo.scss'

export const Logo = props => (
  <NavbarBrand to="/" full={appName} min={appNameShort} />
)
