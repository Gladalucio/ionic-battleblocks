import { Ship } from '../enums/ship.enum';
import { IonicColors } from 'src/app/shared/enums/ionic-colors.enum';

export class PlacableShip {
  public Type: string;
  public Amount = 1;
  public ButtonSelected = false;
  public ButtonColor: IonicColors;

  constructor(Type: Ship) {
    this.Type = Ship[Type];
  }
}
