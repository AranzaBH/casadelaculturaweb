import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioUserComponent } from './cuestionario-user.component';

describe('CuestionarioUserComponent', () => {
  let component: CuestionarioUserComponent;
  let fixture: ComponentFixture<CuestionarioUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuestionarioUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuestionarioUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
