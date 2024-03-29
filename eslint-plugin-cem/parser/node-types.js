// const { NodeTypes } = require("es-html-parser");
var NodeTypes;
(function (NodeTypes) {
    NodeTypes["Document"] = "Document";
    NodeTypes["Tag"] = "Tag";
    NodeTypes["Text"] = "Text";
    NodeTypes["Doctype"] = "Doctype";
    NodeTypes["Comment"] = "Comment";
    NodeTypes["CommentOpen"] = "CommentOpen";
    NodeTypes["CommentClose"] = "CommentClose";
    NodeTypes["CommentContent"] = "CommentContent";
    NodeTypes["Attribute"] = "Attribute";
    NodeTypes["AttributeKey"] = "AttributeKey";
    NodeTypes["AttributeValue"] = "AttributeValue";
    NodeTypes["AttributeValueWrapperStart"] = "AttributeValueWrapperStart";
    NodeTypes["AttributeValueWrapperEnd"] = "AttributeValueWrapperEnd";
    NodeTypes["CloseTag"] = "CloseTag";
    NodeTypes["OpenTagEnd"] = "OpenTagEnd";
    NodeTypes["OpenTagStart"] = "OpenTagStart";
    NodeTypes["DoctypeOpen"] = "DoctypeOpen";
    NodeTypes["DoctypeAttribute"] = "DoctypeAttribute";
    NodeTypes["DoctypeClose"] = "DoctypeClose";
    NodeTypes["ScriptTag"] = "ScriptTag";
    NodeTypes["OpenScriptTagStart"] = "OpenScriptTagStart";
    NodeTypes["OpenScriptTagEnd"] = "OpenScriptTagEnd";
    NodeTypes["ScriptTagContent"] = "ScriptTagContent";
    NodeTypes["StyleTag"] = "StyleTag";
    NodeTypes["OpenStyleTagStart"] = "OpenStyleTagStart";
    NodeTypes["OpenStyleTagEnd"] = "OpenStyleTagEnd";
    NodeTypes["StyleTagContent"] = "StyleTagContent";
    NodeTypes["CloseStyleTag"] = "CloseStyleTag";
    NodeTypes["CloseScriptTag"] = "CloseScriptTag";
    NodeTypes["DoctypeAttributeValue"] = "DoctypeAttributeValue";
    NodeTypes["DoctypeAttributeWrapperStart"] = "DoctypeAttributeWrapperStart";
    NodeTypes["DoctypeAttributeWrapperEnd"] = "DoctypeAttributeWrapperEnd";
})(NodeTypes || (NodeTypes = {}));

// // eslint-disable-next-line no-unused-vars
const { Document, ...restNodeTypes } = NodeTypes;

const NODE_TYPES = {
  Program: "Program",
  ...restNodeTypes,
};

module.exports = {
  NODE_TYPES,
};