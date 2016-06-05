'use strict';

export function findTransitionEndEvent() {
  var div = document.createElement('div');
  var transitions = {
    'transition':'transitionend',
    'OTransition':'oTransitionEnd',
    'MozTransition':'transitionend',
    'WebkitTransition':'webkitTransitionEnd'
  }

  for(var tran in transitions){
    if( div.style[tran] !== undefined ){
      return transitions[tran];
    }
  }
}

export function isTargetInRoot(target, root) {
  while(target) {
    if (target === root) return true;

    target = target.parentNode;
  }

  return false;
}

export function debounce(fn, time) {
  let id;
  return function debounced(...args) {
    clearTimeout(id);
    id = setTimeout(() => {
      return fn.apply(null, args);
    }, time);
  }
}
