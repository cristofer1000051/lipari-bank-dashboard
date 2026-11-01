import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerWidget } from './ticker-widget';

describe('TickerWidget', () => {
  let component: TickerWidget;
  let fixture: ComponentFixture<TickerWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TickerWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(TickerWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
