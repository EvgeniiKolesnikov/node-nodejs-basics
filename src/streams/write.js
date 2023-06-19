import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createWriteStream } from 'node:fs';
import { stdin } from 'node:process';
import { pipeline } from 'node:stream/promises';

// write.js - implement function that writes process.stdin data into file fileToWrite.txt content using Writable Stream

export const write = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const ws = createWriteStream(`${__dirname}/files/fileToWrite.txt`, 'utf-8');

  await pipeline(stdin, ws);
};

write();
