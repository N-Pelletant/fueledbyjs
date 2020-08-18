const ifAttribute = "fbjs-if";

/**
 * Remove all tags in template where linked data in "fbjs-if" attribute is falsy.
 * @param {HTMLElement} template Template to remove children from.
 * @param {Object} data Object where linked data are found.
 * @returns {HTMLElement} Returns template without removed child.
 */
export default function applyIfConditions(template, data) {
  const tags = template.querySelectorAll(`[${ifAttribute}]`);

  tags.forEach(tag => {
    const shouldShow = !!data[tag.getAttribute(ifAttribute)];

    if (!shouldShow) {
      template.removeChild(tag);
    }
  })

  return template;
}