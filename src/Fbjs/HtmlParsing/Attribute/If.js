const ifAttribute = "fbjs-if";

/**
 * Remove all nodes with falsy conditional data in the html template.
 * @param {Fbjs} FbjsElement Element to work on.
 */
export default function applyIfConditions(FbjsElement) {
  const {htmlTemplate, data} = FbjsElement;
  const htmlNodes = htmlTemplate.querySelectorAll(`[${ifAttribute}]`);

  htmlNodes.forEach(htmlNode => {
    const shouldShow = !!data[htmlNode.getAttribute(ifAttribute)];

    if (!shouldShow) {
      htmlNode.style.display = "none";
    }
  });
}