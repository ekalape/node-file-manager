import * as fsPromises from 'node:fs/promises';
import * as fs from 'node:fs';
import { EOL } from 'os';
import path from 'path';
import { resolvePath } from '../utils/resolvePath.js';
import createDir from './createDir.js';
import { pipeline } from 'node:stream/promises';
import { createBrotliCompress, createBrotliDecompress, constants } from 'node:zlib';

export async function copyFile(data) {
  await doubleAction(data, 'copy');
}
export async function moveFile(data) {
  await doubleAction(data, 'move');
}
export async function compressFile(data) {
  await doubleAction(data, 'compress');
}
export async function decompressFile(data) {
  await doubleAction(data, 'decompress');
}
async function doubleAction(data, action) {
  if (!data[0] || !data[0].trim())
    console.log(`${EOL}You have to specify old file path and new place for the file!`);
  else if (!data[1] || !data[1].trim()) console.log(`${EOL}You have to specify new path!`);
  else {
    const oldFileDest = resolvePath(data[0].trim());
    let newFileDest = path.resolve(resolvePath(data[1].trim()), path.basename(oldFileDest));
    if (action === 'compress') {
      newFileDest += '.br';
    }
    if (action === 'decompress') {
      newFileDest = newFileDest.replace('.br', '');
    }

    try {
      await fsPromises
        .access(oldFileDest, fsPromises.constants.R_OK | fsPromises.constants.W_OK)
        .catch((err) => {
          throw Error(`${EOL}You are trying to ${action} unexistent file!${EOL}`);
        });
      await fsPromises
        .access(newFileDest, fsPromises.constants.R_OK | fsPromises.constants.W_OK)
        .catch(async (err) => {
          if (err) {
            const dir = path.dirname(newFileDest);
            await createDir([dir]);
            if (action === 'move' || action === 'copy')
              await fsPromises.copyFile(oldFileDest, newFileDest);
            if (action === 'move') await fsPromises.rm(oldFileDest);
            if (action === 'compress' || action === 'decompress') {
              const rStream = fs.createReadStream(oldFileDest);
              const wStream = fs.createWriteStream(newFileDest);
              const compressFile =
                action === 'compress'
                  ? createBrotliCompress({
                      params: { [constants.BROTLI_PARAM_MODE]: constants.BROTLI_MODE_TEXT },
                    })
                  : createBrotliDecompress();
              await pipeline(rStream, compressFile, wStream);
            }
            throw Error(`${EOL}Done`);
          }
        });
      console.log(`${EOL}Destination file already exists`);
    } catch (err) {
      console.log(err.message);
    }
  }
}
