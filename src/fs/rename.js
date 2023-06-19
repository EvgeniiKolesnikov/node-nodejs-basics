import { stat, writeFile, rename as renameFs } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// +10 rename.js - implement function that renames file 'wrongFilename.txt' to 'properFilename' with extension '.md' (if there's no file wrongFilename.txt or properFilename.md already exists Error with message 'FS operation failed' must be thrown)

export const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const targetFolder = 'files';
  const oldName = 'wrongFilename.txt';
  const newName = 'properFilename.md';
  const oldPath = join(__dirname, targetFolder, oldName);
  const newPath = join(__dirname, targetFolder, newName);

  let canRename = false;

  await stat(newPath).catch((err) => {
    canRename = true;
  });

  if (canRename) {
    await renameFs(oldPath, newPath).catch((err) => {
      err.message = 'FS operation failed';
      console.error(err);
    });
  } else {
    await writeFile(newPath, '', { flag: 'wx' }).catch((err) => {
      err.message = 'FS operation failed';
      console.error(err);
    });
  }
};

rename();