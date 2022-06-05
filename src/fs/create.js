import { writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// +6 create.js - implement function that creates new file fresh.txt with content 'I am fresh and young' inside of the files folder (if file already exists Error with message 'FS operation failed' must be thrown)

export const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const targetFolder = 'files';
  const targetFile = 'fresh.txt';
  const targetText = 'I am fresh and young';
  const targetPath = join(__dirname, targetFolder, targetFile);

  await writeFile(targetPath, targetText, { flag: 'wx' }).catch((err) => {
    err.message = 'FS operation failed';
    console.error(err);
  });
};

create();