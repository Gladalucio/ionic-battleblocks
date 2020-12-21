import { Block } from './block.model';
import { PlacableShip } from './placable-ship.model';
import { Scoreboard } from './scoreboard.model';
import { Ship } from '../enums/ship.enum';
import { IonicColors } from 'src/app/shared/enums/ionic-colors.enum';
import { FieldService } from '../services/field.service';
import { PossibleDirections } from './possible-directions.model';

export class Player {
  Field: Array<Block>;
  PlacableShips: Array<PlacableShip> = [];
  ShowAllPlacableShips = false;
  Score: Scoreboard = new Scoreboard(0, 0);
  LastPlacableShip: PlacableShip = null;
  LastSelectedBlock: Block = null;
  IsPlacing = false;

  constructor(field: Array<Block>, private fieldService: FieldService) {
    this.Field = field;
    this.PlacableShips = this.fieldService.initializePlacableShips();
  }

  // Does nothing
  // click(selectedBlock: Block, gameStarted: boolean) {}

  handlePlaceShipClick(selectedBlock: Block) {
    if (selectedBlock.CanHoldShip && selectedBlock.Position !== this.LastSelectedBlock.Position) {
      this.fieldService.placeShip(
        this.LastSelectedBlock.Position,
        selectedBlock.Position,
        this.LastPlacableShip,
        this.Field
      );

      this.IsPlacing = false;
      const lastPlacedShip = this.PlacableShips.find(ship => ship === this.LastPlacableShip);
      lastPlacedShip.Amount--;
      lastPlacedShip.ButtonSelected = false;
      // const buttonIndex = this.PlacableShips.findIndex(ship => ship.Type === this.LastPlacableShip.Type);
      // this.PlacableShips[buttonIndex].Amount--;
      // this.PlacableShips[buttonIndex].ButtonSelected = false;
      this.setPlacableShipButtonColors();
      this.Field = this.fieldService.resetCanHoldShip(this.Field);
      this.LastSelectedBlock = null;
    } else {
      this.Field = this.fieldService.resetCanHoldShip(this.Field);
      this.LastSelectedBlock = selectedBlock;

      const shipSize = this.fieldService.returnShipSize(Ship[this.LastPlacableShip.Type]);
      const directions: PossibleDirections = this.fieldService.calculatePossibleDirections(selectedBlock.Position, shipSize, this.Field);
      this.Field = this.fieldService.showPossibleDirections(selectedBlock.Position, shipSize, this.Field, directions);
    }
  }

  handlePlaceShipButtons(ship: PlacableShip) {}

  setPlacableShipButtonColors() {
    this.PlacableShips.forEach((ship) =>
      ship.ButtonSelected
        ? (ship.ButtonColor = IonicColors.danger)
        : (ship.ButtonColor = IonicColors.primary)
    );
  }


}
