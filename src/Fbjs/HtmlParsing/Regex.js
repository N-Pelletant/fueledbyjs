export function findAllInterpolations(htmlString) {
    const regex = /\${([a-zA-Z0-9]\w+)}/g; //  matches all ${word} with any word between the braces
    return htmlString.match(regex)
}