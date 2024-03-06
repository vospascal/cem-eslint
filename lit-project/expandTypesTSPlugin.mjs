import path from "path";
import fs from "fs";
const aliasTypes = {};
let currentFilename = "";
let typeChecker;
let options;
let typeScript;
let tsConfigFile;
// const typeDefinitions: string[] = [];
/**
 * CEM Analyzer plugin to expand types in component metadata
 * @param tc TypeScript type checker
 * @param op Configuration options
 * @returns
 */
export function expandTypesPlugin(op = {
    propertyName: "expandedType",
}) {
    options = op;
    return {
        name: "expand-types-plugin",
        collectPhase,
        analyzePhase,
    };
}
/**
 *
 * @param ts Global TypeScript object
 * @param globs File globs to analyze
 * @param configName TypeScript config file name to use during analysis
 * @returns
 */
export function getTsProgram(ts, globs, configName = "tsconfig.json") {
    tsConfigFile = ts.findConfigFile(process.cwd(), ts.sys.fileExists, configName);
    const { config } = ts.readConfigFile(tsConfigFile, ts.sys.readFile);
    const program = ts.createProgram(globs, config);
    typeChecker = program.getTypeChecker();
    return program;
}
function getExpandedType(fileName, typeName) {
    if (typeof aliasTypes[fileName] === "undefined") {
        return typeName;
    }
    if (typeof aliasTypes[fileName][typeName] !== "undefined") {
        return aliasTypes[fileName][typeName];
    }
    if (typeName.includes("|")) {
        return getUnionTypes(fileName, typeName);
    }
    return typeName.startsWith("{") && typeName.endsWith("}")
      ? getObjectTypes(fileName, typeName)
      : typeName;
}
function getUnionTypes(fileName, typeName) {
    const parts = typeName
      .split("|")
      .map((part) => part.trim())
      .filter((part) => part.length > 0);
    return parts.map((part) => getExpandedType(fileName, part)).join(" | ");
}
function getObjectTypes(fileName, typeName) {
    const parts = [
        ...new Set(typeName
          .split(/[:{}]/)
          .map((part) => part.trim())
          .filter((part) => part.length > 0)),
    ];
    parts.forEach((part) => {
        typeName = typeName.replace(new RegExp(part, "g"), getExpandedType(fileName, part));
    });
    return typeName;
}
function collectPhase({ ts, node }) {
    typeScript = ts;
    parseFileTypes(node);
}
function parseFileTypes(node) {
    if (node?.fileName?.includes("node_modules")) {
        return;
    }
    if (node.kind === typeScript.SyntaxKind.SourceFile) {
        currentFilename = path.resolve(node.fileName);
        aliasTypes[currentFilename] = {};
    }
    else if (node.kind === typeScript.SyntaxKind.EnumDeclaration) {
        setEnumTypes(node);
    }
    else if (node.kind === typeScript.SyntaxKind.TypeAliasDeclaration) {
        if (node.type.kind === typeScript.SyntaxKind.UnionType) {
            setBasicUnionTypes(node);
        }
        else if (node.type.kind === typeScript.SyntaxKind.TypeOperator ||
          node.type.kind === typeScript.SyntaxKind.IndexedAccessType) {
            setComplexUnionTypes(node);
        }
    }
}
function setEnumTypes(node) {
    const name = node.name.escapedText;
    const shortText = node.members
      ?.map((mem) => `'${mem.initializer?.text}'`)
      .join(" | ");
    aliasTypes[currentFilename][name] = shortText;
}
function setBasicUnionTypes(node) {
    const name = node.name?.escapedText;
    const unionTypes = node?.type?.types
      .map((type) => {
          const value = type?.literal?.text;
          return typeof value === "string" ? `'${value}'` : value;
      })
      .join(" | ");
    aliasTypes[currentFilename][name] = unionTypes;
}
function setComplexUnionTypes(node) {
    const name = node?.name?.escapedText;
    const resolvedTypes = typeChecker.getDeclaredTypeOfSymbol(typeChecker.getSymbolAtLocation(node.name));
    const unionTypes = resolvedTypes.types
      .map((type) => typeof type.value === "string" ? `'${type.value}'` : type.value)
      .join(" | ");
    aliasTypes[currentFilename][name] = unionTypes;
}
function analyzePhase({ ts, node, moduleDoc, context }) {
    if (node.kind === ts.SyntaxKind.SourceFile) {
        currentFilename = path.resolve(node.fileName);
    }
    if (node.kind !== ts.SyntaxKind.ClassDeclaration) {
        return;
    }
    const component = getComponent(node, moduleDoc);
    if (!component) {
        return;
    }
    updateExpandedTypes(component, context);
}
function getComponent(node, moduleDoc) {
    const className = node.name.getText();
    return moduleDoc.declarations.find((dec) => dec.name === className);
}
function getTypedMembers(component) {
    return [
        ...(component.attributes || []),
        ...(component.members || []),
        ...(component.events || []),
    ].filter((item) => item?.type);
}
function getTypeValue(item, context) {
    const importedType = context?.imports?.find((i) => i.name === item.type?.text);
    if (!importedType) {
        return getExpandedType(currentFilename, item.type.text);
    }
    let resolvedPath = path.resolve(path.dirname(currentFilename), importedType.importPath);
    if (!aliasTypes[resolvedPath] && aliasTypes[resolvedPath + ".ts"]) {
        resolvedPath += ".ts";
    }
    else if (!aliasTypes[resolvedPath] &&
      fs.existsSync(resolvedPath + ".d.ts")) {
        parseTypeDefinitionTypes(resolvedPath + ".d.ts");
        resolvedPath = currentFilename;
    }
    return getExpandedType(resolvedPath, importedType.name);
}
function parseTypeDefinitionTypes(source) {
    if (!source) {
        return;
    }
    const program = typeScript.createProgram([source], tsConfigFile);
    const sourceFile = program.getSourceFile(source);
    typeScript.forEachChild(sourceFile, parseFileTypes);
}
function updateExpandedTypes(component, context) {
    const typedMembers = getTypedMembers(component);
    const propName = options.propertyName || "expandedTypes";
    typedMembers.forEach((member) => {
        const typeValue = getTypeValue(member, context);
        if (typeValue !== member.type.text) {
            member[propName] = {
                text: typeValue,
            };
            member.type.text = typeValue;
        }
    });
}
