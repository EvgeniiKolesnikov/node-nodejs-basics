import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createReadStream } from 'node:fs';
import { stdout } from 'node:process';
import { pipeline } from 'node:stream/promises';

// read.js - implement function that reads file fileToRead.txt content using Readable Stream and prints it's content into process.stdout

export const read = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const rs = createReadStream(`${__dirname}/files/fileToRead.txt`, 'utf-8');

  await pipeline(rs, stdout);
};

read();
