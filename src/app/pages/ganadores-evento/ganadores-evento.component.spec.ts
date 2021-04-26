import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanadoresEventoComponent } from './ganadores-evento.component';

describe('GanadoresEventoComponent', () => {
  let component: GanadoresEventoComponent;
  let fixture: ComponentFixture<GanadoresEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GanadoresEventoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GanadoresEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
