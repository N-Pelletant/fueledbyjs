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
    //Get all nodes in html that correspond to a child
    const selector = Object.keys(children).join(",");
    const childrenNodes = htmlTemplate.querySelectorAll(selector);

    childrenNodes.forEach(childrenNode => {
      /* Find the model corresponding to the child */
      const childModel = children[_.capitalize(childrenNode.localName)];
      /* Id to search html nodes quicker later on */
      const id         = childModel.name + Math.floor(Date.now() * Math.random());

      /* Creating a new instance of the model and adding its properties */
      const child = new Fbjs(childModel.clone());
      child.id = id;
      child.parent = FbjsElement;
      child.data.defaultHtml = childrenNode.innerHTML;

      if (child.props) {
        child.props.forEach(prop => {
          const propValue = childrenNode.getAttribute(prop);
          if(findAllDataPlaceholders(propValue) /* If Prop value is a stirng with interpolation */) {
            const propName = propValue.substring(2,propValue.length - 1);
            if(data.hasOwnProperty(propName)) {
              const oldValue = data[propName];
              const descriptor = Object.getOwnPropertyDescriptor(data, propName);

              if(!descriptor.set) {
                delete data[propName]; /* Remove property from data */
                /* Create getter and setter to get the value */
                Object.defineProperty(data, propName, {
                  get () {
                    return this[`_${propName}`].value;
                  },
                  set (value) {
                    /* Set the value and add the child to the array */
                    this[`_${propName}`].value = value;
                    this[`_${propName}`].childrenToUpdate.forEach(child => {
                      child.data[prop] = value;
                      Fbjs.updateDisplay(child);
                    });
                  }
                });
                /* Pre-set the value holding object, and child array */
                data[`_${propName}`] = {
                  value: oldValue, 
                  childrenToUpdate: [child],
                };
              } else /* If the cascading of update is already created, add a child to the array */{
                data[`_${propName}`].childrenToUpdate.push(child);
              };
            };
            child.data[prop] = data[propName];
          } else if(propValue /* Is a string without interpolation */){
            child.data[prop] = propValue;
          } else /* If there is no value */{
            child.data[prop] = "";
          };
        });
      };

      /* Adding the current child to the children array of the parent */
      implementedChildren[id] = child;

      /* Setting the id of the html node to the same id in the children array */
      childrenNode.setAttribute("id", id);
    });

    // Adding ids to the child nodes in the string template of the parent
    FbjsElement.stringTemplate = htmlTemplate.outerHTML;
  }
}