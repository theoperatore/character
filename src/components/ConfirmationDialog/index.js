import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';

import './index.css';

export default function ConfirmationDialog({ active, title, body, controls, onDismiss }) {
  return (
    <Modal active={active} onDismiss={onDismiss}>
      <div className="confirmation_dialog">
        <div className="confirmation_dialog__title">
          {title}
        </div>
        <div className="confirmation_dialog__body">
          {body}
        </div>
        <div className="confirmation_dialog__controls">
          {controls}
        </div>
      </div>
    </Modal>
  );
}

ConfirmationDialog.propTypes = {
  active: PropTypes.bool,
  title: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired,
  controls: PropTypes.node.isRequired,
  onDismiss: PropTypes.func.isRequired,
};
