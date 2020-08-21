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
        this.parent                 = args.parent;
        /** @type {HTMLElement} */
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
    static updateDataFromEvent(elem, fn, source) {
        fn(elem.data, source);
        Fbjs.updateDisplay(elem);
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

    cloneProperties() {
        return _.cloneDeep(this);
    }
}