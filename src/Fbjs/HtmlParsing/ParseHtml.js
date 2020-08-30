import initiateChildren from './Initiate/Children';
import getHooks from './Initiate/Hook';

import interpolateData from './Interpolate/Data';
import interpolateChild from './Interpolate/Child';
import interpolateEvent from './Interpolate/Event';

import applyIfConditions from "./Attribute/If";

import Fbjs from './../Class'

/**
 * Parse html string into html element with data, events and children.
 * @param {Fbjs} elem Fbjs instance to get needed data from.
 * @param {String} defaultHtml Default html written in placeholder child tags.
 * @returns {HTMLElement} Html template with interpolated data, with or without tags with conditions, events, and children.
 */
const ParseHtml = FbjsElement => {
    FbjsElement.htmlTemplate = new DOMParser().parseFromString(FbjsElement.stringTemplate, "text/html").querySelector(FbjsElement.name);

    if(FbjsElement.children && _.isEmpty(FbjsElement.implementedChildren)) {
        initiateChildren(FbjsElement);
    }

    if(!FbjsElement.data.hooks) {
        getHooks(FbjsElement);
    }

    interpolateData(FbjsElement);

    applyIfConditions(FbjsElement);

    interpolateEvent(FbjsElement);

    interpolateChild(FbjsElement);

    if(FbjsElement.id) {
        FbjsElement.htmlTemplate.setAttribute("id", FbjsElement.id);
    }

    return FbjsElement.htmlTemplate;
}

export default ParseHtml;