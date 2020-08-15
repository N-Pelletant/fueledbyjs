//Importing the functions needed for the class
import ParseHtml from "./HtmlParsing/ParseHtml";

//Definition of the class
export default class Fbjs {
    constructor(args) {
        this.name       = args.name;
        this.template   = args.template;
        this.children   = args.children;
        this.data       = args.data;
        this.methods    = args.methods;
        this.props      = args.props;
    }

    get render() {
        return ParseHtml(this);
    }
}