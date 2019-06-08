import React from 'react'
import { storiesOf } from '@storybook/react'

import {
    NeutralButton,
    NegativeButton,
    PositiveButton
} from './Button'

storiesOf('Button', module)
    .add('NeutralButton', () => <NeutralButton submit>Press Me!</NeutralButton>)
    .add('NegativeButton', () => <NegativeButton submit label="Press Me!" />)
    .add('PositiveButton', () => <PositiveButton submit label="Press Me!" />)
