import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';

// decompress.js - implement function that decompresses archive.gz back to the fileToCompress.txt with same content as before compression using zlib and Streams API

export const decompress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const gzip = createGunzip();
  const rs = createReadStream(`${__dirname}/files/archive.gz`);
  const ws = createWriteStream(`${__dirname}/files/fileToCompress.txt`);

  await pipeline(rs, gzip, ws);
};

decompress();
