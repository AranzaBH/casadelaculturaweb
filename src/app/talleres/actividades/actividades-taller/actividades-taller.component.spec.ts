import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesTallerComponent } from './actividades-taller.component';

describe('ActividadesTallerComponent', () => {
  let component: ActividadesTallerComponent;
  let fixture: ComponentFixture<ActividadesTallerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadesTallerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadesTallerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
