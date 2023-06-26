export default class HelpIndications {
  constructor(command, explanation, use_format = '') {
    this.command = command;
    this.explanation = explanation;
    this.use_format = use_format;
  }
}
