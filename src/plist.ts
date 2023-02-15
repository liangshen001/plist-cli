#!/usr/bin/env node
import {Argument, program} from 'commander';
import { createRequire } from 'module';
import {generate} from "./index";
const require = createRequire(import.meta.url);

program.version(require('../package.json').version, '-v, --version')

program
    .addArgument(new Argument('<target>', 'target plist'))
    .option('-n, --name [name]', 'output name')
    .option('-o, --output [output]', 'output dir', './')
    .action((target, cmd) => {
        generate(target, cmd)
    });

program.parse();


