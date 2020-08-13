export function findAllInterpolations(htmlString) {
    const regex = /\${([a-zA-Z0-9]\w+)}/g;
    return htmlString.match(regex)
}