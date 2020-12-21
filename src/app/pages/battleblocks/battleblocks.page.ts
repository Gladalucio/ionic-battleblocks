import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InstructionModalComponent } from './modals/instruction-modal/instruction-modal.component';
import { Settings } from './models/settings.model';
import { Player } from './models/player.model';
import { PlayerPC } from './models/player-pc.model';
import { FieldService } from './services/field.service';

//#region Constants
const BLOCK_COUNT = 100;
const COLOR_FIELD = 'dodgerblue';
const COLOR_FIELD_ACTIVE = '';
const COLOR_SHIP = 'white';
//#endregion Constants

@Component({
  selector: 'app-battleblocks',
  templateUrl: './battleblocks.page.html',
  styleUrls: ['./battleblocks.page.scss'],
})
export class BattleblocksPage implements OnInit, AfterViewInit {
  //#region Variables
  playerA: Player = new Player(
    this.fieldService.initializeField(BLOCK_COUNT, COLOR_FIELD),
    this.fieldService,
  );
  playerB: PlayerPC = new PlayerPC(
    this.fieldService.initializeField(BLOCK_COUNT, COLOR_FIELD),
    this.fieldService,
  );

  settings: Settings = new Settings();
  gameStarted = false;
  //#endregion Variables

  constructor(
    private modalCtrl: ModalController,
    private fieldService: FieldService,
    // public playerService: PlayerService,
    // public playerPCService: PlayerPCService
  ) {}

  ngOnInit() {}

  async ngAfterViewInit() {
    this.showInstructionModal();
    this.playerB.generateShips();
  }

  //#region Get
  get getGameCanStart() {
    return this.playerA.PlacableShips.every((ship) => ship.Amount === 0);
  }

  get getCanResetShips() {
    return this.playerA.PlacableShips.some((ship) => ship.Amount === 0);
  }
  //#endregion Get

  startGame() {}

  stopGame() {}

  resetGame() {}

  async showInstructionModal() {
    if (localStorage.getItem('do-not-show-instructions')) {
      return;
    }

    const modal = await this.modalCtrl.create({
      component: InstructionModalComponent,
      backdropDismiss: false,
    });
    modal.onWillDismiss().then((modalData) => {
      if (modalData.role === 'input') {
        const doNotShowAgainToggle: boolean = modalData.data;
        console.log(doNotShowAgainToggle);
        if (doNotShowAgainToggle) {
          localStorage.setItem(
            'do-not-show-instructions',
            doNotShowAgainToggle.toString()
          );
        }
      }
    });
    await modal.present();
  }

  // For development only!
  dummyClick() {
    console.log(this.playerA.Field);
    console.log(this.playerB.Field);
  }
}
