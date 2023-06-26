import { readFile } from 'node:fs/promises';
import { EOL } from 'os';
import path from 'path';
import { resolvePath } from '../utils/resolvePath.js';
import { createHash } from 'crypto';

export default async function hashFile(data) {
  if (!data[0] || !data[0].trim()) console.log(`${EOL}You have to specify file path!`);
  else {
    const filePath = resolvePath(data[0].trim());
    try {
      const fileContent = await readFile(filePath, { encoding: 'utf8' });
      const hash = createHash('sha256').update(fileContent, 'utf8').digest('hex');

      console.log(`For the file ${path.basename(filePath)} hash is ${hash}`);
    } catch (err) {
      if (err.code === 'ENOENT') console.log(`${EOL}The file doesn't exist`);
      else console.log(err.message);
    }
  }
}
