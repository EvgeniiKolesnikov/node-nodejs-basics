import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// +6 read.js - implement function that prints content of the 'fileToRead.txt' into console (if there's no file fileToRead.txt Error with message 'FS operation failed' must be thrown)

export const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const targetFolder = 'files';
  const targetFile = 'fileToRead.txt';
  const targetPath = join(__dirname, targetFolder, targetFile);

  await readFile(targetPath)
    .then((data) => console.log(data.toString().replace(/\s+/g, ' ')))
    .catch((err) => {
      err.message = 'FS operation failed';
      console.error(err);
    });
};

read();