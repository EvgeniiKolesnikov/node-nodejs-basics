import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash, createHmac } from 'node:crypto';
import { readFile } from 'node:fs/promises';

// calcHash.js - implement function that calculates SHA256 hash for file fileToCalculateHashFor.txt and logs it into console as hex

export const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const targetPath = `${__dirname}/files/fileToCalculateHashFor.txt`;
  const data = await readFile(targetPath);

  const secret = 'rss school axaxa';
  const hmac = createHmac('sha256', secret).update(data).digest('hex');
  const hash = createHash('sha256').update(data).digest('hex');

  console.log(hash);
  // console.log(hmac);

  // createHash - 7b90ad9e325c1c22b15c36cbe19413e3c471e5a711b8b828c8ebfcfd71d1d6db
  // createHmac - 9cf75479b10084b36ca3d68e4a2828317f19e7f2dffa089e620542006e3fae3a
};

calculateHash();
