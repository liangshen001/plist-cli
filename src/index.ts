#!/usr/bin/env node
import {Argument, program} from 'commander';
import { createRequire } from 'module';
import os from "os";
import bPlistParser from "bplist-parser";
import fs from "fs";
import camelcase from "camelcase";
const require = createRequire(import.meta.url);

program.version(require('../package.json').version, '-v, --version')

program
    .addArgument(new Argument('<target>', 'target plist'))
    .option('-n, --name [name]', 'output name')
    .option('-o, --output [output]', 'output dir', './')
    .action((target, cmd) => {
        build(target, cmd)
    });

program.parse();


export function build(target: string, options: {output?: string, name?: string}) {
    let plistPath = target.replace(/^~/, os.homedir);
    let plistJson = bPlistParser.parseFileSync(plistPath);
    let name = plistPath.slice(plistPath.lastIndexOf('/') + 1)
        .replace(/\./g, '_');
    let className =  camelcase(options.name || name, {pascalCase: true});
    let fileName = (camelcase(options.name || name)).replace(/[A-Z]/g, m => "-" + m.toLowerCase())
    let dts = `export interface ${className} ${parseJson(plistJson[0])}`;
    fs.writeFileSync(`${options.output || ''}${fileName}.d.ts`, dts)
}

function parseJson(json: any, i: number = 0): string {
    let pre = '';
    for (let j = 0; j < i; j++) {
        pre += '    ';
    }
    let returnValue = '';
    const type = typeof json;
    switch (type) {
        case "undefined":
        case "boolean":
        case "number":
        case "string":
        case "bigint":
        case "symbol":
            return type;
        case "object":
            if (json instanceof Array) {
                let subType = 'any';
                if (json[0]) {
                    subType = parseJson(json[0], i);
                }
                return `${subType}[]`;
            } else if (json instanceof Date) {
                return 'Date';
            } else {
                return `{\n` + Object.keys(json).map(k => {
                    const needQuote = ([' ', '-', ','].some(i => k.includes(i))) ? "'" : '';
                    return (`    ${pre}${needQuote}${k}${needQuote}: ${parseJson(json[k], i + 1)};\n`);
                }).join('') + `${pre}}`;
            }
        case "function":
            return '';
    }
    return returnValue;
}
