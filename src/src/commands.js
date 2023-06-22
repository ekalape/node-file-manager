import { EOL } from 'os';
import homeDir from './utils/homeDir.js';
import userName from './utils/userName.js';

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
  //os: systemOperations,
  mkdir: (await import('./operations/createDir.js')).default,
};

async function listenCommands(data) {
  const args = data.toString().split(' ');
  const command = args[0].trim();
  if (command && Object.keys(fileOperation).includes(command)) {
    await fileOperation[command](args.slice(1));
  } else {
    console.log(`${EOL}Unknown command${EOL}Type "help" for full commands list${EOL}`);
  }
  homeDir.alert();
}

export default listenCommands;

function commandsList() {
  const helpList = [
    ['up', 'go upper from current directory', 'up'],
    ['cd', 'go to dedicated folder from current directory', 'cd path_to_directory'],
    ['ls', 'print list of all files and folders in current directory', 'ls'],
    ['add', 'add an empty file to the working directory', 'add new_file_name'],
    ['cat', 'read a file', 'cat path_to_file'],
    ['rn', 'rename a file ', 'rn path_to_file new_filename'],
    ['cp', 'copy a file ', 'cp path_to_file path_to_new_directory'],
    ['mv', 'move a file ', 'mv path_to_file path_to_new_directory'],
    ['rm', 'delete a file ', ' rm path_to_file'],
    ['hash', 'calculate a hash for the file ', 'hash path_to_file'],
    ['compress', 'compress a file ', 'compress path_to_file path_to_destination'],
    ['decompress', 'decompress a file ', 'decompress path_to_file path_to_destination'],
    ['.exit', 'exit the file manager', '.exit or ctrl+C'],
  ];
  console.table(helpList);
}

export function exitFileManager() {
  userName.sayBye();
  process.exit();
}
