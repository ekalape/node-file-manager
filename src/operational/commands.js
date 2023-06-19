import * as operations from './operations.js';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const homePath = path.join(__dirname, 'files');
let userName = 'guest';

const fileOperation = {
  help: commandsList,
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
  if (command !== 'exit') console.log(`You are currently in ${homePath}\n`);

  if (command && Object.keys(fileOperation).includes(command)) {
    await fileOperation[command](args.slice(1));
  } else {
    console.log('Unknown command\n');
    //process.exit();
  }
}

export default listenCommands;

function commandsList() {
  const helpList = [
    ['up', 'go upper from current directory', 'up'],
    ['cd', 'go to dedicated folder from current directory', 'cd path_to_directory'],
    ['ls', 'print list of all files and folders in current directory', 'ls'],
    ['add', 'add an empty file to the working directory', 'add path_to_folder'],
    ['cat', 'read a file', 'cat path_to_file'],
    ['rn', 'rename a file ', 'rn path_to_file new_filename'],
    ['cp', 'copy a file ', 'cp path_to_file path_to_new_directory'],
    ['mv', 'move a file ', 'mv path_to_file path_to_new_directory'],
    ['rm', 'delete a file ', ' rm path_to_file'],
    ['hash', 'calculate a hash for the file ', 'hash path_to_file'],
    ['compress', 'compress a file ', 'compress path_to_file path_to_destination'],
    ['decompress', 'decompress a file ', 'decompress path_to_file path_to_destination'],
    ['exit', 'exit the file manager', 'exit or ctrl+C'],
  ];
  console.table(helpList);
}

export function exitFileManager() {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!\n`);
  process.exit();
}
