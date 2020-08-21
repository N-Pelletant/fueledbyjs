import Fbjs from './../../Class';
import _ from 'lodash';

/**
 * Initiate all children in the html template as properties.
 * @param {Fbjs} FbjsElement Element to work on.
 */

export default function initiateChildren(FbjsElement) {
  const {htmlTemplate, children, implementedChildren} = FbjsElement;

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
          child.data[prop] = childrenNode.getAttribute(prop) || "";
        });
      }

      implementedChildren[id] = child;

      childrenNode.setAttribute("id", id);

      

    });

    FbjsElement.stringTemplate = htmlTemplate.outerHTML;
  }
}