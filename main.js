#!/usr/bin/env node
'use strict';

const fs = require('fs');
const minimist = require('minimist');
const mediumToMarkdown = require('medium-to-markdown');
const util = require('util') 

const writeFile = util.promisify(fs.writeFile) 

const args = minimist(process.argv.slice(2), {
    alias: {
        h: 'help',
        m: 'medium',
        o: 'output',
    }
});

if (args.h || args.help) {
	console.log(`
usage: main.js [-h] [-v] [-medium url/to/your/post] [-o /path/to/output/file]

Download Medium blog post and convert it to markdown.

arguments:
  -h, --help                          show this help message and exit
  -m, --medium url/to/your/post       your blog post url
  -o, --output /path/to/output/file   file path for the markdown content
`);
	process.exit(0);
}

if (!args.medium) {
	throw new Error('medium post url is required');
}
if (!args.output) {
	throw new Error('file path for markdown content required');
}

// Enter url here
mediumToMarkdown
	.convertFromUrl(args.medium)
	.then(markdown => writeFile(args.output, markdown))
	.catch(e => console.log(`Something went wrong! ${e}`));