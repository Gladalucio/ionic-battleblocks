import { Block } from './block.model';
import { Scoreboard } from './scoreboard.model';
import { FieldService } from '../services/field.service';
import { Status } from '../enums/status.enum';
import { PlacableShip } from './placable-ship.model';
import { Ship } from '../enums/ship.enum';
import { PossibleDirections } from './possible-directions.model';

export class PlayerPC {
  Field: Array<Block>;
  Score: Scoreboard = new Scoreboard(0, 0);
  ShowPlacedShips = true; // For development only!

  constructor(field: Array<Block>, private fieldService: FieldService) {
    this.Field = field;
  }

  click(selectedBlock: Block, gameStarted: boolean) {
    console.log(selectedBlock);

    // if (!gameStarted) {
    //   console.log('Game hasn\'t started yet');
    //   return;
    // }
    // /* if status isn't null, block has already been hit */
    // if (selectedBlock.Status !== null) {
    //   console.log('Block has already been hit');
    //   return;
    // }

    // console.log(selectedBlock);

    // selectedBlock.Status =
    //   selectedBlock.Ship === null ? Status.Miss : Status.Hit;
  }

  generateShips() {
    const placableShips = this.fieldService.initializePlacableShips();

    placableShips.forEach(ship => {
      const shipSize = this.fieldService.returnShipSize(Ship[ship.Type]);
      let directions = new PossibleDirections();
      let randomNumber: number;

      /* Find a random number that allows for one or more directions */
      while (!directions.Right && !directions.Left && !directions.Up && !directions.Down) {
        randomNumber = Math.floor(Math.random() * this.Field.length);
        directions = this.fieldService.calculatePossibleDirections(randomNumber, shipSize, this.Field);
        console.log('after fitting + collision', directions);
      }

      const possibleDirectionArray: Array<string> = [];
      if (directions.Right) { possibleDirectionArray.push( 'Right' ); }
      if (directions.Left) { possibleDirectionArray.push( 'Left' ); }
      if (directions.Up) { possibleDirectionArray.push( 'Up' ); }
      if (directions.Down) { possibleDirectionArray.push( 'Down' ); }

      const chosenDirection = Math.floor(Math.random() * possibleDirectionArray.length);
      let to: number;
      switch (possibleDirectionArray[chosenDirection]) {
        case 'Right':
          to = randomNumber + 1;
          break;
        case 'Left':
          to = randomNumber - 1;
          break;
        case 'Up':
          to = randomNumber - 10;
          break;
        case 'Down':
          to = randomNumber + 10;
          break;
      }
      this.fieldService.placeShip(randomNumber, to, ship, this.Field);
    });
  }
}
