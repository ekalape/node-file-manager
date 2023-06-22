import * as operations from './operations.js';
import { EOL } from 'os';
import * as fs from 'node:fs';
let userName = 'guest';

const fileOperation = {
  help: commandsList,
  '.exit': exitFileManager,
  up: operations.goUpper,
  cd: operations.goToTheDir,
  ls: operations.listFiles,
  cat: operations.readFileToConsole,
  add: operations.addEmptyFile,
  write: operations.writeFile,
  rn: operations.renameFile,
  cp: operations.copyFile,
  mv: operations.moveFile,
  rm: operations.deleteFile,
  hash: operations.hashFile,
  compress: operations.compressFile,
  decompress: operations.decompressFile,
  //os: systemOperations,
  mkdir: operations.createDir,
};

async function listenCommands(name, data) {
  userName = name;
  const args = data.toString().split(' ');
  const command = args[0].trim();

  if (command && Object.keys(fileOperation).includes(command)) {
    await fileOperation[command](args.slice(1));
  } else {
    console.log(`${EOL}Unknown command${EOL}Type "help" for full commands list${EOL}`);
  }
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
  console.log(
    `----------------${EOL}Thank you for using File Manager, ${userName}, goodbye!${EOL}`,
  );
  process.exit();
}
