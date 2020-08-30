/**
 * Return all matches of '${...}' in the string, with any kind of word between the braces. Return null if no parameter given.
 * @param {String} str The string to search matches in.
 * @returns {(Array|null)} Return array of strings or null if no matches.
 */

function findAllDataPlaceholders(str) {
    if(!str) return null;                   // On renvoie null si il n'y a pas de paramètre

    const regex = /\${([a-zA-Z0-9]\w+)}/g;  // On créé l'expression régulière
    return str.match(regex);                // On renvoie les correspondances dans la chaine
}

export default findAllDataPlaceholders;