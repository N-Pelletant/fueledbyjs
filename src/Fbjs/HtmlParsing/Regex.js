export function findAllDataInterpolations(htmlString) {
    const regex = /\${([a-zA-Z0-9]\w+)}/g;
    return htmlString.match(regex)
}