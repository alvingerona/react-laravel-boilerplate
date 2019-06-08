import React from 'react';

export const InputPrependIcon = ({ iconClass }) => (
    <div className="input-group-prepend">
      <span className="input-group-text">
        <i className={iconClass} />
      </span>
    </div>
  )