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
 * Add events with corresponding method to all html nodes tags with custom attributes for events.
 * @param {Fbjs} FbjsElement Element to work on.
 */
export default function interpolateEvent(FbjsElement) {
  const {htmlTemplate, methods} = FbjsElement;

  methodAttribute.forEach(attribute => {
    const htmlNodes = htmlTemplate.querySelectorAll(`[${attribute[0]}]`);

    htmlNodes.forEach(htmlNode => {
      const func = methods[htmlNode.getAttribute(attribute[0])];
      htmlNode.addEventListener(attribute[1], () => { Fbjs.updateDataFromEvent(FbjsElement, func, htmlNode) });
    });
  });
}