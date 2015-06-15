'use strict';

exports.findTransitionEndEvent = function() {
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

exports.isTargetInRoot = function(target, root) {
  while(target) {
    if (target === root) return true;

    target = target.parentNode;
  }

  return false;
}