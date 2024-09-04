import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBlankComponent } from './layout-blank.component';

describe('LayoutBlankComponent', () => {
  let component: LayoutBlankComponent;
  let fixture: ComponentFixture<LayoutBlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutBlankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
