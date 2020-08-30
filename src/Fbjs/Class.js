import _ from 'lodash';

//Importing the functions needed for the class
import ParseHtml from "./HtmlParsing/ParseHtml";

//Definition of the class
export default class Fbjs {
    constructor(args) {
        this.name                   = args.name;
        this.stringTemplate         = args.template || args.stringTemplate;
        this.children               = args.children;
        this.data                   = args.data;
        this.methods                = args.methods;
        this.props                  = args.props;
        this.hooks                  = args.hooks;
        this.parent                 = null;
        this.htmlTemplate           = null;
        this.implementedChildren    = {};
        this.id                     = null;
    }

    /**
     * Update data in Fbjs instance according to method triggered.
     * @param {Fbjs} elem Fbjs instance to get data from.
     * @param {Function} fn Function to trigger on event.
     * @param {HTMLElement} source Html element which triggers the events.
     */
    static updateDataFromEvent(
        elem,   // Instance de fbjs
        fn,     // Méthode 
        source  // Element html qui déclenche l'evenement
    ) {
        fn(elem.data, source);      // On applique la méthode avec les deux arguments
        Fbjs.updateDisplay(elem);   // On met a jour l'affichage
    }

    /**
     * Update display in parent of Fbjs instance.
     * @param {Fbjs} elem Fbjs instance to update display of.
     */
    static updateDisplay(elem) {
        const {name, parent, id} = elem;

        const newChild = elem.render();
        if(parent instanceof Fbjs) {
            const oldChild = document.getElementById(id);
            oldChild.parentElement.replaceChild(newChild, oldChild);
        } else {
            const oldChild = parent.querySelector(name);
            parent.replaceChild(newChild, oldChild);
        }
    }

    /**
     * Set html template as property and return it.
     * @returns {HTMLElement} Html parsed template.
     */
    render() {
        this.htmlTemplate = ParseHtml(this);
        return this.htmlTemplate;
    }

    clone() {
        return _.cloneDeep(this);
    }
}