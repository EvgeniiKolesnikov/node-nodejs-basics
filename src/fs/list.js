import { readdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// +6 list.js - implement function that prints all array of filenames from 'files' folder into console (if files folder doesn't exists Error with message 'FS operation failed' must be thrown)

export const list = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const targetFolder = 'files';
  const targetPath = join(__dirname, targetFolder);

  await readdir(targetPath, { flag: 'wx' })
    .then((data) => console.log(data.toString().split(',')))
    .catch((err) => {
      err.message = 'FS operation failed';
      console.error(err);
    });
};

list();