import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';

// compress.js - implement function that compresses file fileToCompress.txt to archive.gz using zlib and Streams API

export const compress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const gzip = createGzip();
  const rs = createReadStream(`${__dirname}/files/fileToCompress.txt`);
  const ws = createWriteStream(`${__dirname}/files/archive.gz`);

  await pipeline(rs, gzip, ws);
};

compress();
