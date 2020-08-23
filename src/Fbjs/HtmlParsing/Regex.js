/**
 * Return all matches of '${...}' in the string, with any kind of word between the braces. Return null if no parameter given.
 * @param {String} str The string to search matches in.
 * @returns {(Array|null)} Return array of strings or null if no matches.
 */

function findAllDataPlaceholders(str) {
    if(!str) return null;

    const regex = /\${([a-zA-Z0-9]\w+)}/g;
    return str.match(regex);
}

export default findAllDataPlaceholders;