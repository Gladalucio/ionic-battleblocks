import { Injectable } from '@angular/core';
import { Block } from '../models/block.model';
import { PlacableShip } from '../models/placable-ship.model';
import { Ship } from '../enums/ship.enum';
import { PossibleDirections } from '../models/possible-directions.model';

@Injectable({
  providedIn: 'root',
})
export class FieldService {
  constructor() {}

  initializeField(blockCount: number, fieldColor: string) {
    const field = Array<Block>(blockCount);
    for (let i = 0; i < blockCount; i++) {
      field[i] = new Block({
        Color: fieldColor,
        Position: i,
      });
    }
    return field;
  }

  initializePlacableShips(): Array<PlacableShip> {
    const placableShips: Array<PlacableShip> = [];
    for (const ship in Ship) {
      if (isNaN(parseInt(ship, 10))) {
        const shipType = ship;
        placableShips.push(new PlacableShip(Ship[shipType]));
      }
    }
    return placableShips;
  }

  calculatePossibleDirections(position: number, shipSize: number, field: Array<Block>): PossibleDirections {
    console.log(field[position]);
    /* Check if the new ship fits in the row or column */
    console.log('Position', position, 'shipSize', shipSize);
    const directions = new PossibleDirections(
      {
        Right: ((position % 10) + shipSize) < 10 ? true : false,
        Left: ((position % 10) - shipSize) >= 0 ? true : false,
        Up: position - (shipSize * 10) >= 0 ? true : false,
        Down: position + (shipSize * 10) < 100 ? true : false
      }
    );

    console.log('after fitting', directions);

    /* Collision detection */
    const checkCollision = (positions: Array<number>) => {
      positions.forEach(pos => {
        if (field[pos].Ship !== null) {
          return false;
        }
      });
      return true;
    };

    // /* shows 'directions[dir]' as undefined so collision detection doesn't work here */
    // for (const direction in directions) {
    //   if (Object.prototype.hasOwnProperty.call(directions, direction)) {
    //     const dir = directions[direction];
    //     console.log(dir, directions[dir], direction[dir]);
    //     if (directions[dir]) {
    //       console.log(dir);
    //       checkCollision(
    //         this.returnDirectionPositions(dir.toString(), position, shipSize)
    //       );
    //     }
    //   }
    // }

    if (directions.Right) {
      directions.Right = checkCollision(
        this.returnDirectionPositions('Right', position, shipSize)
      );
    }
    if (directions.Left) {
      directions.Left = checkCollision(
        this.returnDirectionPositions('Left', position, shipSize)
      );
    }
    if (directions.Up) {
      directions.Up = checkCollision(
        this.returnDirectionPositions('Up', position, shipSize)
      );
    }
    if (directions.Down) {
      directions.Down = checkCollision(
        this.returnDirectionPositions('Down', position, shipSize)
      );
    }

    return directions;
  }

  showPossibleDirections(
    position: number,
    shipSize: number,
    field: Array<Block>,
    directions: PossibleDirections
  ): Array<Block> {
    const setCanHoldShip = (positions: Array<number>) => {
      positions.forEach(pos => {
        field[pos].CanHoldShip = true;
      });
    };

    // for (const direction in directions) {
    //   if (Object.prototype.hasOwnProperty.call(directions, direction)) {
    //     const dir = directions[direction];
    //     console.log(dir, directions[dir]);
    //     if (directions[dir]) {
    //       console.log(dir);
    //       setCanHoldShip(
    //         this.returnDirectionPositions(dir.toString(), position, shipSize)
    //       );
    //     }
    //   }
    // }

    if (directions.Right) {
      setCanHoldShip(
        this.returnDirectionPositions('Right', position, shipSize)
      );
    }
    if (directions.Left) {
      setCanHoldShip(
        this.returnDirectionPositions('Left', position, shipSize)
      );
    }
    if (directions.Up) {
      setCanHoldShip(
        this.returnDirectionPositions('Up', position, shipSize)
      );
    }
    if (directions.Down) {
      setCanHoldShip(
        this.returnDirectionPositions('Down', position, shipSize)
      );
    }

    return field;
  }

  placeShip(from: number, to: number, ship: PlacableShip, field: Array<Block>): Array<Block> {
    const shipSize = this.returnShipSize(Ship[ship.Type]) - 1;
    const delta = to - from;

    const setShip = (positions: Array<number>) => {
      positions.forEach(pos => {
        console.log(pos);
        field[pos].Ship = Ship[ship.Type];
      });
    };

    if (delta >= 0 && delta < 10) {
      /* Right */
      setShip(
        this.returnDirectionPositions('Right', from, shipSize)
      );
    } else if (delta <= 0 && delta > -10) {
      /* Left */
      setShip(
        this.returnDirectionPositions('Left', from, shipSize)
      );
    } else if (delta <= -10) {
      /* Up */
      setShip(
        this.returnDirectionPositions('Up', from, shipSize)
      );
    } else if (delta >= 10) {
      /* Down */
      setShip(
        this.returnDirectionPositions('Down', from, shipSize)
      );
    }

    return field;
  }

  returnShipSize(ship: Ship): number {
    switch (ship) {
      case Ship.Battleship:
        return 4;
      case Ship.Carrier:
        return 5;
      case Ship.Cruiser:
        return 3;
      case Ship.Destroyer:
        return 2;
      case Ship.Submarine:
        return 3;
    }
  }

  returnDirectionPositions(direction: 'Right' | 'Left' | 'Up' | 'Down', position: number, shipSize: number): Array<number> {
    const positions: Array<number> = [];
    const end = this.returnEndPosition(direction, position, shipSize);

    switch (direction) {
      case 'Right':
        for (let index = position; index <= end; index++) {
          positions.push(index);
        }
        break;
      case 'Left':
        for (let index = position; index >= end; index--) {
          positions.push(index);
        }
        break;
      case 'Up':
        for (let index = position; index >= end; index -= 10) {
          positions.push(index);
        }
        break;
      case 'Down':
        for (let index = position; index <= end; index += 10) {
          positions.push(index);
        }
        break;
    }

    return positions;
  }

  returnEndPosition(direction: 'Right' | 'Left' | 'Up' | 'Down', position: number, shipSize: number): number {
    switch (direction) {
      case 'Right':
        return position + shipSize;
      case 'Left':
        return position - shipSize;
      case 'Up':
        return position - (shipSize * 10);
      case 'Down':
        return position + (shipSize * 10);
    }
  }

  resetCanHoldShip(field: Array<Block>): Array<Block> {
    field.forEach(block => {
      block.CanHoldShip = false;
    });
    return field;
  }

}
