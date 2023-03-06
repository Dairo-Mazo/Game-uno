import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoUnoComponent } from './juego-uno.component';

describe('JuegoUnoComponent', () => {
  let component: JuegoUnoComponent;
  let fixture: ComponentFixture<JuegoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuegoUnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
