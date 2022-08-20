/*
 * GNU AGPL-3.0 License
 *
 * Copyright (c) 2022 - present core.ai . All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
 * for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see https://opensource.org/licenses/AGPL-3.0.
 *
 */

/* eslint-env node */
import * as documentation from 'documentation';
import glob from "glob";
import * as path from "path";
import * as fs from "fs";
import clc from 'cli-color';

const TAG_INCLUDE_IN_API_DOCS = "@INCLUDE_IN_API_DOCS";
const FILE_NAME_SUFFIX = '-API',
    MD_EXT = '.md';

function getIndexMarkdown(docRoot, filePaths) {
    let markdown = "# API docs\nThe list of all APIs:\n";
    for(let filePath of filePaths){
        let relativePathToDocRoot = filePath.replace(docRoot, ''); // Eg. utils/Metrics-API.md
        let fileName = path.basename(relativePathToDocRoot); // Metrics-API.md
        let hrefName = path.parse(fileName).name; //Metrics-API
        let suffixLength = FILE_NAME_SUFFIX.length + MD_EXT.length; // len(-API.md)
        let apiFullName = relativePathToDocRoot.slice(0, -suffixLength); // utils/Metrics
        markdown += `\n1. [${apiFullName}](${hrefName})`;
        console.log("processing file: ", relativePathToDocRoot);
    }
    return markdown;
}

async function generateDocIndex(docRoot) {
    const indexFileName = `${docRoot}GitHub-API-Index.md`;
    let allDocFiles = await _getAllFiles(docRoot, '/**/*.md');
    let indexMarkdown = getIndexMarkdown(docRoot, allDocFiles);
    console.log("creating index file: ", clc.green(indexFileName));
    fs.mkdirSync(path.dirname(indexFileName), { recursive: true })
    fs.writeFileSync(indexFileName, indexMarkdown);
}

async function _getAllFiles(docRoot, globPattern) {
    return new Promise((resolve, reject)=>{
        let getDirectories = function (src, callback) {
            glob(src + globPattern, callback);
        };
        getDirectories(docRoot, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

async function _processFile(filePath, srcRelativePath, generatedDocRoot) {
    return new Promise((resolve, reject)=>{
        const code = fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});
        if(!code.includes(TAG_INCLUDE_IN_API_DOCS)) {
            resolve();
            return;
        }
        let extName = path.extname(srcRelativePath); // Eg. util/index.js
        const extensionIndex = srcRelativePath.lastIndexOf(extName);
        let markdownPath = srcRelativePath.substring(0, extensionIndex); // util/index
        markdownPath = `${generatedDocRoot}${markdownPath}${FILE_NAME_SUFFIX}.md`; // util/index.md
        console.log(`Generating Doc for ${clc.green(filePath)} to ${clc.green(markdownPath)}`);
        documentation.build(filePath, {
            shallow: true
        })
            .then(documentation.formats.md)
            .then(markdownDocStr => {
                fs.mkdirSync(path.dirname(markdownPath), { recursive: true })
                fs.writeFileSync(markdownPath, markdownDocStr);
                resolve();
            })
            .catch(reject);
    });
}


async function generateDocs() {
    let srcRoot = process.argv[2];
    let generatedDocRoot = process.argv[3];
    if(!srcRoot.endsWith("/")){
        srcRoot = srcRoot + "/";
    }
    if(!generatedDocRoot.endsWith("/")){
        generatedDocRoot = generatedDocRoot + "/";
    }
    console.log(`Generating docs for "${clc.green(srcRoot)}" to folder "${clc.green(generatedDocRoot)}"`);
    let allSrcFiles = await _getAllFiles(srcRoot, '/**/*.js')
    console.log(`Found ${clc.blue(allSrcFiles.length)} js files. Scanning for files with comment // ${clc.blue(TAG_INCLUDE_IN_API_DOCS)} `);
    console.log(`Cleaning Generating docs folder "${clc.green(generatedDocRoot)}"`);
    fs.rmSync(generatedDocRoot, { recursive: true, force: true });
    for(let srcPath of allSrcFiles){
        let srcRelativePath = srcPath.replace(srcRoot, "");
        await _processFile(srcPath, srcRelativePath, generatedDocRoot);
    }
    await generateDocIndex(generatedDocRoot);
}

generateDocs();
