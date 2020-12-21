import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructionModalComponent } from './instruction-modal/instruction-modal.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [InstructionModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  exports: [InstructionModalComponent]
})
export class BattleblocksModalsModule { }
