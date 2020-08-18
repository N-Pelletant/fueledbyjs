import findAllDataPlaceholders from './../Regex';

/**
 * Interpolates data in all placeholders and value attributes.
 * @param {HTMLElement} template Template to interpolate data in.
 * @param {Object} data Object containing all data to interpolate in the template.
 * @returns {HTMLElement} Returns template with data interpolated.
 */
export default function interpolateData(template, data) {
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
      findAndReplaceDataInTextNode(childNode, data)
    } else if (childNode.nodeName !== "#text") {
      recursiveTextNodeModifier(childNode, data, modifier);
    }
  })
}