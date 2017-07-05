'use strict';



import PropTypes from 'prop-types';



import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import cn from 'classnames';
import Icon from '../Icon';

export default class extends React.Component {
  static displayName = 'Notification';

  static propTypes = {
    id: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func.isRequired,
    message: PropTypes.string,
    component: PropTypes.element,
    direction: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    direction: 'left',
    onClick() {},
    message: 'Notification',
  };

  dismissTimeout = null;

  componentWillReceiveProps(nextProps) {
    if (nextProps.active === true) {
      this.dismissTimeout = setTimeout(() => {
        this.props.onDismiss();

      // hardcoding until a better way of keeping the enter/exit animation
      // in sync with this duration is found.
      }, 4000);
    }
    else {
      clearTimeout(this.dismissTimeout);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.dismissTimeout);
  }

  _click = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    this.props.onClick(ev);
  };

  renderMessage = () => {
    return <div className='pr2 text-blue bg-blue timer'>
      <p><Icon icon='fa fa-exclamation' className='p2'/>{this.props.message}</p>
    </div>
  };

  render() {
    let notifCSS = cn({
      'notification': true,
      'from-left': this.props.direction !== 'right',
      'from-right': this.props.direction === 'right',
    });

    return <ReactCSSTransitionGroup
      component={OnlyChild}
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
      transitionName='notification'
    >
      {
        this.props.active
          ?
              <div
                className={notifCSS}
                onClick={this._click}
              >
                { this.props.component || this.renderMessage() }
              </div>
          : null
      }
    </ReactCSSTransitionGroup>
  }
}

class OnlyChild extends React.Component {
  render() {
    return React.Children.toArray(this.props.children)[0] || null;
  }
}
