 const fileOperation = {
  up: goUpper,
  cd: goToTheDir,
  ls: listFiles,
  cat: readFileToConsole,
  add: addEmptyFile,
  rn: renameFile,
  cp: copyFile,
  mv: moveFile,
  rm: deleteFile,
  hash: hashFile,
  compress: compressFile,
  decompress: decompressFile,
  os:systemOperations
};


export default fileOperation;