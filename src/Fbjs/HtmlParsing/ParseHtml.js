import {interpolateData, interpolateChild, interpolateEvent} from "./Interpolate";
import {applyConditions} from "./Condition"

const ParseHtml = function ({
    name,
    template,
    children = {},
    data = {},
    methods = {}
},
    defaultHtml = ""
) {
    const dataTemplate = interpolateData(template, {...data, defaultHtml});

    const parsedTemplate = new DOMParser().parseFromString(dataTemplate, "text/html").querySelector(name);

    const conditionateTemplate = applyConditions(parsedTemplate, data);

    const eventTemplate = interpolateEvent(conditionateTemplate, methods);

    const childTemplate = interpolateChild(eventTemplate, children);

    return childTemplate;
}

export default ParseHtml;