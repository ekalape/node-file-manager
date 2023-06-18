import * as operations from './operations.js';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const homePath = path.join(__dirname, 'files');
let userName = 'guest';

const fileOperation = {
  exit: exitFileManager,
  //up: goUpper,
  //cd: goToTheDir,
  //ls: listFiles,
  //cat: readFileToConsole,
  add: operations.addEmptyFile,
  //rn: renameFile,
  //cp: copyFile,
  //mv: moveFile,
  //rm: deleteFile,
  //hash: hashFile,
  //compress: compressFile,
  //decompress: decompressFile,
  //os: systemOperations,
};

async function listenCommands(name, data) {
  userName = name;
  const args = data.toString().split(' ');
  const command = args[0].trim();
  if (command !== 'exit') console.log(`You are currently in ${homePath}`);

  if (command) {
    await fileOperation[command](args.slice(1));
  } else {
    console.log('undefined command');
    process.exit();
  }
}

export default listenCommands;

export function exitFileManager() {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit();
}
