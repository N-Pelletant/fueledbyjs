/**
 * Return all matches of '${...}' in the string, with any kind of word between the braces
 * @param {String} str the string to search in.
 * @returns {(Array|null)} return array of strings or null if no matches.
 */

function findAllDataPlaceholders(str) {
    const regex = /\${([a-zA-Z0-9]\w+)}/g;
    return str.match(regex);
}

export default findAllDataPlaceholders;