import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BattleblocksPage } from './battleblocks.page';

describe('BattleblocksPage', () => {
  let component: BattleblocksPage;
  let fixture: ComponentFixture<BattleblocksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleblocksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BattleblocksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
