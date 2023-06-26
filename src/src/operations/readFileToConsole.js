import { createReadStream } from 'node:fs';
import { EOL } from 'os';
import path from 'path';
import { resolvePath } from '../utils/resolvePath.js';

export default async function readFileToConsole(data) {
  if (data[0] && data[0].trim().length > 0) {
    try {
      const destPath = resolvePath(data[0].trim());
      const stream = createReadStream(destPath, { encoding: 'utf-8' });
      stream.on('data', (data) => {
        console.log(`${EOL}Reading file '${path.basename(destPath)}':${EOL}-------`);
        console.log(data);
        console.log('-------');
      });
      stream.on('error', (err) => {
        if (err.code === 'ENOENT') console.log(`${EOL}File doesn't exist`);
        else throw Error();
      });
    } catch (err) {
      console.log('Reading ERROR', err.message);
    }
  } else console.log(`${EOL}You didn't enter any path!`);
}
