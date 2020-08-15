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
    const parsedTemplate = new DOMParser().parseFromString(template, "text/html").querySelector(name);

    const dataTemplate = interpolateData(parsedTemplate, {...data, defaultHtml});

    const conditionTemplate = applyConditions(dataTemplate, data);

    const eventTemplate = interpolateEvent(conditionTemplate, methods);

    const childTemplate = interpolateChild(eventTemplate, children);

    return childTemplate;
}

export default ParseHtml;