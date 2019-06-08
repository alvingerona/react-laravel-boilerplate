import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router'

import { DashSidebar } from './DashSidebar'

storiesOf('Dashboard Sidebar', module)
  // Need to add this decorator since the component has Links in it which need
  // a router to work. We use MemoryRouter since it's ideal for testing envs
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add('Light Theme', () => (
    <DashSidebar />
  ))
