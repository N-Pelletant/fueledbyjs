import {findAllDataInterpolations} from './Regex';
import ParseHtml from './ParseHtml';

export function interpolateData(htmlTemplate, data) {
    const interpolations = findAllDataInterpolations(htmlTemplate);

    if(interpolations) {
        interpolations.forEach(elem => {
            const key = elem.substring(2, elem.length - 1);
            htmlTemplate = htmlTemplate.replace(
                elem, 
                data[key]
            );
        });
    }

    return htmlTemplate;
}

export function interpolateChild(template = {}, children = {}) {
    
    Object.keys(children).forEach(key => {
        const childName = key.toLowerCase();
        const childContent = children[key];
        const childTags = template.querySelectorAll(childName);

        const props = childContent.props || [];

        childTags.forEach(childTag => {
            props.forEach(elem => {
                childContent.data[elem] = childTag.getAttribute(elem)
            })
            const defaultHtml = childTag.innerHTML;
            template.replaceChild(ParseHtml(childContent, [defaultHtml]), childTag)
        });
    });

    return template;
}

const methodAttribute = [
    ["fbjs-click","click"],
    ["fbjs-hoverOn", "mouseover"],
    ["fbjs-hoverOff", "mouseout"],
];

export function interpolateEvent(template = {}, methods = {}) {
    methodAttribute.forEach(attribute => {
        const tags = template.querySelectorAll(`[${attribute[0]}]`);
        tags.forEach(tag => {
            tag.addEventListener(attribute[1], methods[tag.getAttribute(attribute[0])]);
        })
    })

    return template;
}