export class Settings {
  Visible = true;
  Settings: Array<Setting>;

  constructor(args?: Array<Setting>) {}

  toggleVisibility() {
    this.Visible = !this.Visible;
  }
}

interface Setting {
  Name: string;
  Text: string;
  Value: boolean | string;
}
/* Possible settings to be added:
  - Music?
  - Speed?
  - Do not show Instruction-modal?
*/
