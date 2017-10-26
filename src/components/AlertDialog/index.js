import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import Button from 'components/Button';
import Type from 'components/Type';

import './index.css';

/* istanbul ignore next */ const noop = () => {};

export default function AlertDialog({ active, message, onConfirm }) {
  return (
    <Modal onDismiss={noop} active={active}>
      <div className="alert">
        {message}
        <div className="alert__controls">
          <Button className="alert__control" variant="bare" color="red" onClick={/* istanbul ignore next */ () => onConfirm('no')}>No</Button>
          <Button variant="bare" color="green" onClick={/* istanbul ignore next */ () => onConfirm('yes')}>Yes</Button>
        </div>
      </div>
    </Modal>
  );
}

AlertDialog.propTypes = {
  /** Boolean to determine to show this confirmation or not */
  active: PropTypes.bool,
  /** The message on which you want confirmation */
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Type)
  ]).isRequired,
  /** The callback function to be called with the response of the user: 'yes': 'no' */
  onConfirm: PropTypes.func.isRequired,
};

AlertDialog.defaultProps = {
  active: false,
};
