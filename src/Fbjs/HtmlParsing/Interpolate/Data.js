import findAllDataPlaceholders from './../Regex';

/**
 * Interpolates data in all placeholders and value attributes of the html template of the element.
 * @param {Fbjs} FbjsElement Element to work on.
 */
export default function interpolateData(FbjsElement) {
  const {htmlTemplate, data} = FbjsElement;

  recursiveTextNodeModifier(htmlTemplate, data, findAndReplaceDataInTextNode);

  const elementsWithValueAttribute = htmlTemplate.querySelectorAll("[value]");

  elementsWithValueAttribute.forEach(element => {
    let attributeValue = element.getAttribute("value");
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

    element.setAttribute("value", attributeValue);
  });
}

/**
 * Replace all placeholders in text node by data.
 * @param {HTMLElement} textNode Text node to place data in.
 * @param {Object} data Object containing data to place in text.
 */
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

/**
 * Navigates through the html tree and apply the modifier to all not empty text nodes.
 * @param {HTMLElement} node Node to start the navigation from.
 * @param {Object} data Object containing all data to use with the modifier.
 * @param {Function} modifier Modifier to apply to all text nodes.
 */
const recursiveTextNodeModifier = (node, data, modifier) => {
  node.childNodes.forEach(childNode => {
    if (childNode.nodeName === "#text" && childNode.nodeValue !== " ") {
      modifier(childNode, data);
    } else if (childNode.nodeName !== "#text") {
      recursiveTextNodeModifier(childNode, data, modifier);
    }
  });
}