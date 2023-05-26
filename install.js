#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

console.log('Copying template files...');
const sourceDir = path.join(__dirname, 'templates', 'basic');

const argv = process.argv.slice(2);
const rootDir = argv[0] || '.';
fs.mkdirSync(rootDir);
process.chdir(rootDir);
fs.copy(sourceDir, process.cwd())
  .then(() => console.log('Template files copied successfully!'))
  .catch((err) => console.error(err));

const pkg = { name: rootDir, version: '0.0.0' };
fs.writeFileSync(
  path.resolve(root, 'package.json'),
  JSON.stringify(pkg, null, 2)
);
