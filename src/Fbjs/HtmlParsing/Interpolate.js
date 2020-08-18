import findAllDataPlaceholders from './Regex';
import ParseHtml from './ParseHtml';
import Fbjs from '../Class';

export function interpolateData(template, data) {
    recursiveTextNodeModifier(template, data, findAndReplaceDataInTextNode);

    const elemWithValue = template.querySelectorAll("[value]");

    elemWithValue.forEach(elem => {
        let attributeValue = elem.getAttribute("value");
        const placeholders = findAllDataPlaceholders(attributeValue);

        if (placeholders) {
            placeholders.forEach(placeholder => {
                const key = placeholder.substring(2, placeholder.length - 1);
                attributeValue = attributeValue.replace(
                    placeholder,
                    data[key]
                );
            });
        }

        elem.setAttribute("value", attributeValue);
    })

    return template;
}

const findAndReplaceDataInTextNode = (textNode, data) => {
    let str = textNode.nodeValue;
    const placeholders = findAllDataPlaceholders(str);

    if (placeholders) {
        placeholders.forEach(placeholder => {
            const key = placeholder.substring(2, placeholder.length - 1);
            str = str.replace(
                placeholder,
                data[key]
            );
        });
    }

    textNode.nodeValue = str;
}

const recursiveTextNodeModifier = (node, data, modifier) => {
    node.childNodes.forEach(childNode => {
        if (childNode.nodeName === "#text" && childNode.nodeValue !== " ") {
            findAndReplaceDataInTextNode(childNode, data)
        } else if (childNode.nodeName !== "#text") {
            recursiveTextNodeModifier(childNode, data, modifier);
        }
    })
}

export function interpolateChild(template, children) {
    
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
    ["fbjs-click", "click"],
    ["fbjs-hoverOn", "mouseover"],
    ["fbjs-hoverOff", "mouseout"],
    ["fbjs-change", "change"]
];

export function interpolateEvent(template = {}, elem) {
    methodAttribute.forEach(attribute => {
        const tags = template.querySelectorAll(`[${attribute[0]}]`);
        tags.forEach(tag => {
            const func = elem.methods[tag.getAttribute(attribute[0])];
            tag.addEventListener(attribute[1], () => {Fbjs.updateDataFromEvent(elem, func, tag)});
        })
    })

    return template;
}