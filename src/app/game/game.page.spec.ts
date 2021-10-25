import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GamePage } from './game.page';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('GamePage', () => {
  let component: GamePage;
  let fixture: ComponentFixture<GamePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePage ],
      imports: [HttpClientTestingModule,IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have game', () => {
    expect(component.game('rock')).toBeTruthy();
  });

  it('should have tryAgain', () => {
    expect(component.tryAgain).toBeTruthy();
  });

  it('should have restart', () => {
    expect(component.restart).toBeTruthy();
  });

});
