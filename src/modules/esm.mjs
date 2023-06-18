import { readFile } from 'node:fs/promises';
import { release, version } from 'node:os';
import { createServer as createServerHttp } from 'node:http';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import './files/c.js';

// cjsToEsm.cjs - rewrite it to it's equivalent in ECMAScript notation (and rename it to esm.mjs)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathA = path.join(__dirname, './files/a.json');
const pathB = path.join(__dirname, './files/b.json');

const random = Math.random();

let unknownObject;

if (random > 0.5) {
  await readFile(pathA, 'utf-8').then(
    (data) => (unknownObject = JSON.parse(data))
  );
} else {
  await readFile(pathB, 'utf-8').then(
    (data) => (unknownObject = JSON.parse(data))
  );
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const createMyServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

export { unknownObject, createMyServer };
