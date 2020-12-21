import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-instruction-modal',
  templateUrl: './instruction-modal.component.html',
  styleUrls: ['./instruction-modal.component.scss'],
})
export class InstructionModalComponent implements OnInit {
  isChecked = false;

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  async close() {
    await this.modalCtrl.dismiss(this.isChecked, 'input');
  }
}
