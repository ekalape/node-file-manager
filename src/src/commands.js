import { EOL } from 'os';
import homeDir from './utils/homeDir.js';
import userName from './utils/userName.js';
import commandsList from './utils/commandsList.js';

const fileOperation = {
  help: commandsList,
  '.exit': exitFileManager,
  up: (await import('./operations/goUpper.js')).default,
  cd: (await import('./operations/goToTheDir.js')).default,
  ls: (await import('./operations/listFiles.js')).default,
  cat: (await import('./operations/readFileToConsole.js')).default,
  add: (await import('./operations/addEmptyFile.js')).default,
  write: (await import('./operations/writeFile.js')).default,
  rn: (await import('./operations/renameFile.js')).default,
  cp: (await import('./operations/multipleActions.js')).copyFile,
  mv: (await import('./operations/multipleActions.js')).moveFile,
  rm: (await import('./operations/deleteFile.js')).default,
  hash: (await import('./operations/hashFile.js')).default,
  compress: (await import('./operations/multipleActions.js')).compressFile,
  decompress: (await import('./operations/multipleActions.js')).decompressFile,
  os: (await import('./operations/systemOperations.js')).default,
  mkdir: (await import('./operations/createDir.js')).default,
};

async function listenCommands(data) {
  const args = data
    .split(/ (?=(?:(?:(?:[^'"]*['"]){2})*[^'"]*$))/)
    .map((arg) => arg.replace(/(^['"]|['"]$)/g, ''));

  const command = args[0].trim();
  if (command && Object.keys(fileOperation).includes(command)) {
    await fileOperation[command](args.slice(1));
  } else {
    console.log(`${EOL}Unknown command${EOL}Type "help" for full commands list${EOL}`);
  }
  homeDir.alert();
}

export default listenCommands;

export function exitFileManager() {
  userName.sayBye();
  process.exit();
}
