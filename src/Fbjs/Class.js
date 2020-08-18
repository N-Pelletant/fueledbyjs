//Importing the functions needed for the class
import ParseHtml from "./HtmlParsing/ParseHtml";

//Definition of the class
export default class Fbjs {
    constructor(args) {
        this.name           = args.name;
        this.template       = args.template;
        this.children       = args.children;
        this.data           = args.data;
        this.methods        = args.methods;
        this.props          = args.props;
        this.htmlTemplate   = null;
        this.parent         = null;
    }

    /**
     * Set html template as property and return it.
     * @returns {HTMLElement} Html parsed template.
     */
    render() {
        this.htmlTemplate = ParseHtml(this);
        return this.htmlTemplate;
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
        const {name, parent} = elem;

        elem.htmlTemplate = ParseHtml(elem);
        if(parent instanceof Fbjs) {

        } else {
            const elemToReplace = parent.getElementsByTagName(name)[0];
            parent.replaceChild(elem.htmlTemplate, elemToReplace);
        }
    }
}