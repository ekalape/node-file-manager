import homeDir from '../utils/homeDir.js';
import * as fs from 'node:fs';
import path from 'path';

export default async function addEmptyFile(data) {
  let homePath = homeDir.get();
  if (data[0] && data[0].trim().length > 0) {
    const fileName = data[0].trim();
    try {
      if (data.length === 0) throw Error('Please, add file name to create');
      const destination = path.resolve(homePath, fileName);

      fs.open(destination, 'wx', (err) => {
        if (err) {
          if (err.code === 'EEXIST') console.log('This file name exists already');
          else if (err.code === 'ENOENT')
            console.log('You are trying to create a file in unexistent directory');
          else console.log(err.message);
        } else {
          fs.writeFile(destination, '', (err) => {
            if (err) throw Error('Writing operation failed');
          });
          console.log(`${fileName} file is created succesfully!`);
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  } else console.log('You have to enter a file name');
}
