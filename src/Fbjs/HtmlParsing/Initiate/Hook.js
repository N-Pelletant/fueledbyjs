import Fbjs from './../../Class';
import _ from 'lodash';

/**
 * Link all hooked data from the children in the data of the parent.
 * @param {Fbjs} FbjsElement Element to work on.
 */

export default function getHooks(FbjsElement) {
  if (_.isEmpty(FbjsElement.implementedChildren)) return;

  if (!FbjsElement.data.hooks) FbjsElement.data.hooks = {};

  Object.keys(FbjsElement.implementedChildren).forEach(childId => {
    const child = FbjsElement.implementedChildren[childId];
    const { hooks } = child;
    
    hooks.forEach(hook => {
      const oldValue = child.data[hook];
      delete child.data[hook]; 
      
      Object.defineProperty(child.data, hook, {
        get() {
          return child.data[`_${hook}`];
        },
        set(value) {
          child.data[`_${hook}`] = value;
          FbjsElement.data.hooks[hook] = value;
          Fbjs.updateDisplay(FbjsElement);
        }
      });
      
      FbjsElement.data.hooks[hook] = oldValue;
      child.data[`_${hook}`] = oldValue;
    });
  });
}