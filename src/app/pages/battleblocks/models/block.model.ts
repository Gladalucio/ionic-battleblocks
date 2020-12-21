import { Status } from '../enums/status.enum';
import { Ship } from '../enums/ship.enum';

export class Block {
  public Color: string;
  public Position: number;
  public Ship: Ship;
  public Status: Status;
  public CanHoldShip: boolean;

  constructor(args: BlockArgs) {
    this.Color = args.Color;
    this.Position = args.Position;
    this.Ship = args.Ship || null;
    this.Status = args.Status || null;
    this.CanHoldShip = args.CanHoldShip || false;
  }
}

interface BlockArgs {
  Color: string;
  Position: number;
  Ship?: Ship;
  Status?: Status;
  CanHoldShip?: boolean;
}
