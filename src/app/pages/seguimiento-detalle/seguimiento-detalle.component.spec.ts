import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoDetalleComponent } from './seguimiento-detalle.component';

describe('SeguimientoDetalleComponent', () => {
  let component: SeguimientoDetalleComponent;
  let fixture: ComponentFixture<SeguimientoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimientoDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
