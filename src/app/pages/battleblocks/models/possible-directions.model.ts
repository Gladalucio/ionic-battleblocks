export class PossibleDirections {
  public Right: boolean;
  public Left: boolean;
  public Up: boolean;
  public Down: boolean;

  constructor(args?: PossibleDirectionsArgs) {
    if (args) {
      this.Right = args.Right || false;
      this.Left = args.Left || false;
      this.Up = args.Up || false;
      this.Down = args.Down || false;
    }
  }
}

interface PossibleDirectionsArgs {
  Right: boolean;
  Left: boolean;
  Up: boolean;
  Down: boolean;
}
