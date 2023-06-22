import { EOL } from 'os';

export default {
  userName: '',
  set(name) {
    this.userName = name;
  },
  get() {
    return this.userName;
  },
  sayHello() {
    console.log(`----------------${EOL}Welcome to the File Manager, ${this.userName}!${EOL}`);
  },
  sayBye() {
    console.log(
      `----------------${EOL}Thank you for using File Manager, ${this.userName}, goodbye!${EOL}`,
    );
  },
};
