import _ from "lodash";
import Fbjs from '../../Class';

/**
 * Place all children in html in place of nodes with the same name. 
 * @param {Fbjs} FbjsElement Element to work in.
 */
export default function interpolateChild(FbjsElement) {
    const { htmlTemplate, implementedChildren } = FbjsElement;

    if(!_.isEmpty(implementedChildren)) {
        Object.keys(implementedChildren).forEach(id => {
            const oldChild = htmlTemplate.querySelector(`#${id}`);
            const newChild = implementedChildren[id].render();

            oldChild.parentElement.replaceChild(newChild, oldChild);
        });
    }
}