import {generate} from "../src";
import * as path from "path";
import * as fs from "fs";

describe("Test Generate", () => {
    test("generate", () => {
        generate(path.join(process.cwd(), 'tests', 'com.googlecode.iterm2.plist'));
        const dts = path.join(process.cwd(), 'com-googlecode-iterm2-plist.d.ts');
        if (fs.existsSync(dts)) {
            fs.rmSync(dts);
        } else {
            throw new Error();
        }
    });
});