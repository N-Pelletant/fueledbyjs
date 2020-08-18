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
const ParseHtml = function (elem, defaultHtml) {
    const {
        name, 
        template, 
        children = {}, 
        data = {},
    } = elem;

    const parsedTemplate = new DOMParser().parseFromString(template, "text/html").querySelector(name);

    const dataTemplate = interpolateData(parsedTemplate, {...data, defaultHtml});

    const conditionTemplate = applyIfConditions(dataTemplate, data);

    const eventTemplate = interpolateEvent(conditionTemplate, elem);

    const childTemplate = interpolateChild(eventTemplate, children);

    return childTemplate;
}

export default ParseHtml;