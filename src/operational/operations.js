import * as fs from 'node:fs';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const homePath = path.join(__dirname, '..', 'files');
console.log(homePath);

export async function addEmptyFile(data) {
  const fileName = data[0].trim();
  try {
    if (data.length === 0) throw Error('Please, add file name to create');
    const destination = path.join(homePath, fileName);

    fs.open(destination, 'wx', (err) => {
      if (err) console.log('This file name exists already');
      else {
        fs.writeFile(destination, '', (err) => {
          if (err) throw Error('Writing operation failed');
        });
        console.log(`${fileName} file is created succesfully!`);
      }
    });
  } catch (err) {
    console.log(err.message);
  }
}
