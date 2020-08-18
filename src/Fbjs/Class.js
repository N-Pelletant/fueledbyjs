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

    get render() {
        this.htmlTemplate = ParseHtml(this);
        return this.htmlTemplate;
    }

    static updateDataFromEvent(elem, cb, source) {
        cb(elem.data, source);
        Fbjs.updateElement(elem);
    }

    static updateElement(elem) {
        const {name, parent} = elem;

        elem.htmlTemplate = ParseHtml(elem);
        if(parent instanceof Fbjs) {

        } else {
            const elemToReplace = parent.getElementsByTagName(name)[0];
            parent.replaceChild(elem.htmlTemplate, elemToReplace);
        }
    }
}