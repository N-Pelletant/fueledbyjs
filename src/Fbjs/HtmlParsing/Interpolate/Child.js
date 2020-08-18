import ParseHtml from './../ParseHtml';

/**
 * Place all children in template in place of tags with the same name. 
 * @param {HTMLElement} template Template to place children in.
 * @param {Object} children Object containing all children to place in the template.
 * @returns {HTMLElement} Returns template with child replaced.
 */
export default function interpolateChild(template, children) {

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