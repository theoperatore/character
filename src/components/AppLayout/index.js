import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './index.css';

export default function AppLayout({ nav, body, horizontal, className, ...props }) {
  const containerCss = cn(
    'app_layout--container',
    horizontal && 'app_layout--horizontal',
    className);
  return (
    <div className={containerCss}>
      <nav className="app_layout--nav">
        {nav}
      </nav>
      <section className="app_layout--body">
        {body}
      </section>
    </div>
  );
}

AppLayout.propTypes = {
  nav: PropTypes.node,
  body: PropTypes.node,
  horizontal: PropTypes.bool,
};

AppLayout.defaultProps = {
  horizontal: false,
};
