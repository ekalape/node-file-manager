import * as os from 'node:os';

export default function systemOperations(data) {
  if (data[0] && data[0].trim()) {
    const command = data[0].slice(2);
    console.log('command', command);
    try {
      switch (command) {
        case 'EOL':
        case 'eol':
          console.log(`Here is your EOL: ${os.EOL}`);
          break;
        case 'cpus':
          const cps = os.cpus().map((x) => x.model.split(' @ '));
          console.table(cps);
          break;
        case 'homedir':
          console.log(`Here is your homedir: ${os.homedir()}`);
          break;
        case 'username':
          console.log(`Here is your username: ${os.hostname()}`);
          break;
        case 'architecture':
          console.log(`Here is your architecture: ${os.arch}`);
          break;
        case 'help':
          console.table(helpCommands);
          break;
        default:
          console.log(
            `Unknown os command${os.EOL}Type os --help to see all available os commands${os.EOL}`,
          );
      }
    } catch (err) {
      console.log(err.code, err.message);
    }
  } else
    console.log(
      `You have to type a os command in format os --command${os.EOL}Type os --help to see all available os commands${os.EOL}`,
    );
}

const helpCommands = [
  ['--EOL', 'display system EOL(default End-Of-Line)'],
  ['--cpus', 'display available logical cpus models and their clock rate '],
  ['--homedir', 'display home directory'],
  ['--username', 'display current system user name'],
  ['--architecture', 'display CPU architecture'],
  ['--help', 'display available os commands'],
];
