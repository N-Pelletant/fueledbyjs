export function applyConditions(template = {}, data = {}) {
    const tags = template.querySelectorAll("[fbjs-if]");

    tags.forEach(tag => {
        const shouldShow = !!data[tag.getAttribute("fbjs-if")];

        if(!shouldShow) {
            template.removeChild(tag);
        }
    })

    return template;
}