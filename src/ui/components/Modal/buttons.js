'use strict';

import React from 'react';
import Icon from '../Icon';

export function createSaveBtn(clickHandler) {
  return (
    <button 
      onClick={clickHandler}
      className='text-green'
    ><Icon icon='fa fa-pencil'/> Save</button>
  );
}

export function createEditBtn(clickHandler) {
  return (
    <button
      onClick={clickHandler}
      className='text-green'
    ><Icon icon='fa fa-pencil'/> Edit</button>
  );
}

export function createRemoveBtn(clickHandler) {
  return (
    <button
      onClick={clickHandler}
      className='text-red'
    ><Icon icon='fa fa-remove'/> Remove</button>
  );
}

export function createCancelBtn(clickHandler) {
  return (
    <button
      onClick={clickHandler}
      className='text-red'
    ><Icon icon='fa fa-remove'/> Cancel</button>
  );
}

export function createRestBtn(clickHandler) {
  return (
    <button
      onClick={clickHandler}
      className='text-green'
    ><Icon icon='fa fa-bed'/> Rest</button>
  );
}