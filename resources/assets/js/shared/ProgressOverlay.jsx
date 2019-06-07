import React from 'react';

export const ProgressOverlay = ({ show }) => {
    if (!show) {
      return null
    }
  
    return (
      <div className="progress-overlay">
        <div className="position-relative">
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              style={{ width: ' 100%' }}
            >
              Loading please wait...
            </div>
          </div>
        </div>
      </div>
    )
  }