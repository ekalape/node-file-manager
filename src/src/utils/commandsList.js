import HelpIndications from './HelpIndications.js';

export default function commandsList() {
  const helpList = [
    new HelpIndications('up', 'go upper from current directory', 'up'),
    new HelpIndications(
      'cd',
      'go to dedicated folder from current directory',
      'cd path_to_directory',
    ),
    new HelpIndications('ls', 'print list of all files and folders in current directory', 'ls'),
    new HelpIndications('add', 'add an empty file to the working directory', 'add new_file_name'),
    new HelpIndications('cat', 'read a file', 'cat path_to_file'),
    new HelpIndications('rn', 'rename a file ', 'rn path_to_file new_filename'),
    new HelpIndications('cp', 'copy a file ', 'cp path_to_file path_to_new_directory'),
    new HelpIndications('mv', 'move a file ', 'mv path_to_file path_to_new_directory'),
    new HelpIndications('rm', 'delete a file ', ' rm path_to_file'),
    new HelpIndications('hash', 'calculate a hash for the file ', 'hash path_to_file'),
    new HelpIndications(
      'compress',
      'compress a file ',
      'compress path_to_file path_to_destination',
    ),
    new HelpIndications(
      'decompress',
      'decompress a file ',
      'decompress path_to_file path_to_destination',
    ),
    new HelpIndications('os', 'os commands ', 'os --os_command'),
    new HelpIndications('.exit', 'exit the file manager', '.exit or ctrl+C'),
  ];
  console.table(helpList);
}
