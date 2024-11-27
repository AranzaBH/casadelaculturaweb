import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallerDetailsComponent } from './taller-details.component';

describe('TallerDetailsComponent', () => {
  let component: TallerDetailsComponent;
  let fixture: ComponentFixture<TallerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TallerDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TallerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
