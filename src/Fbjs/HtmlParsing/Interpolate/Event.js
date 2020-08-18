import Fbjs from '../../Class';

/**
 * Custom events - standard events pairs
 */
const methodAttribute = [
  ["fbjs-click", "click"],
  ["fbjs-hoverOn", "mouseover"],
  ["fbjs-hoverOff", "mouseout"],
  ["fbjs-change", "change"]
];

/**
 * Add events with corresponding method in all template tags with custom attributes for events.
 * @param {HTMLElement} template Template to add events in.
 * @param {Fbjs} elem Fbjs instance to get methods and data from.
 * @returns {HTMLElement} Returns template with all events added.
 */
export default function interpolateEvent(template, elem) {
  methodAttribute.forEach(attribute => {
    const tags = template.querySelectorAll(`[${attribute[0]}]`);
    tags.forEach(tag => {
      const func = elem.methods[tag.getAttribute(attribute[0])];
      tag.addEventListener(attribute[1], () => { Fbjs.updateDataFromEvent(elem, func, tag) });
    })
  })

  return template;
}