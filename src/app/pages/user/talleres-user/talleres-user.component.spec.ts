import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalleresUserComponent } from './talleres-user.component';

describe('TalleresUserComponent', () => {
  let component: TalleresUserComponent;
  let fixture: ComponentFixture<TalleresUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalleresUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalleresUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
