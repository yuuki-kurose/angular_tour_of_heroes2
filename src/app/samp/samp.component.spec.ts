import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampComponent } from './samp.component';

describe('SampComponent', () => {
  let component: SampComponent;
  let fixture: ComponentFixture<SampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
