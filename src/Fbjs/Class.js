//Importing the functions needed for the class
import ParseHtml from "./HtmlParsing/ParseHtml";

//Definition of the class
export default class Fbjs {
    constructor(props) {
        this.name       = props.name;
        this.template   = props.template;
        this.children   = props.children;
        this.data       = props.data;
        this.methods    = props.methods;
    }

    get render() {
        return ParseHtml(this);
    }
}