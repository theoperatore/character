import React from 'react';

import './index.css';

export default function LoadingIndicator() {
  return (
    <div className="loading">
      <div className="loading_dot" />
      <div className="loading_dot" />
      <div className="loading_dot" />
    </div>
  );
}
