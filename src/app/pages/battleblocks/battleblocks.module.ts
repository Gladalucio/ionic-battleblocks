import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BattleblocksPageRoutingModule } from './battleblocks-routing.module';

import { BattleblocksPage } from './battleblocks.page';
import { BattleblocksModalsModule } from './modals/battleblocks-modals.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BattleblocksPageRoutingModule,
    BattleblocksModalsModule
  ],
  declarations: [BattleblocksPage]
})
export class BattleblocksPageModule {}
