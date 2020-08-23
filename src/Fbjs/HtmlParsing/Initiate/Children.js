import Fbjs from './../../Class';
import findAllDataPlaceholders from './../Regex.js';
import _ from 'lodash';

/**
 * Initiate all children in the html template as properties.
 * @param {Fbjs} FbjsElement Element to work on.
 */

export default function initiateChildren(FbjsElement) {
  const {htmlTemplate, data, children, implementedChildren} = FbjsElement;

  if(children) {
    const selector = Object.keys(children).join(",");
    const childrenNodes = htmlTemplate.querySelectorAll(selector);

    childrenNodes.forEach(childrenNode => {
      const childModel = children[_.capitalize(childrenNode.localName)];
      const id         = childModel.name + Math.floor(Date.now() * Math.random());

      const child = new Fbjs(childModel.cloneProperties());
      child.id = id;
      child.parent = FbjsElement;
      child.data.defaultHtml = childrenNode.innerHTML;

      if (child.props) {
        child.props.forEach(prop => {
          const propValue = childrenNode.getAttribute(prop);
          if(findAllDataPlaceholders(propValue)) {
            const propName = propValue.substring(2,propValue.length - 1);
            if(data.hasOwnProperty(propName)) {
              const oldValue = data[propName];
              const descriptor = Object.getOwnPropertyDescriptor(data, propName);
              if(!descriptor.set) {
                delete data[propName];
                Object.defineProperty(data, propName, {
                  get () {
                    return this[`_${propName}`].value
                  },
                  set (value) {
                    this[`_${propName}`].value = value;
                    this[`_${propName}`].childrenToUpdate.forEach(child => {
                      child.data[prop] = value;
                      Fbjs.updateDisplay(child);
                    })
                  }
                });
                data[`_${propName}`] = {
                  value: oldValue, 
                  childrenToUpdate: [child]
                };
              } else {
                data[`_${propName}`].childrenToUpdate.push(child);
              }
            }
            child.data[prop] = data[propName];
          } else if(propValue){
            child.data[prop] = propValue;
          } else {
            child.data[prop] = "";
          }
        });
      }

      implementedChildren[id] = child;

      childrenNode.setAttribute("id", id);
    });

    FbjsElement.stringTemplate = htmlTemplate.outerHTML;
  }
}