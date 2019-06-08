import React from 'react';
import {
    Label as LabelBS
  } from 'reactstrap'

export const Label = ({ children, className, ...rest }) => (
    <LabelBS for={name} className={className ? className : ''} {...rest}>
        {children}
    </LabelBS>
)