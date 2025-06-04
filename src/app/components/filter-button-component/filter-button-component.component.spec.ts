import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterButtonComponentComponent } from './filter-button-component.component';

describe('FilterButtonComponentComponent', () => {
  let component: FilterButtonComponentComponent;
  let fixture: ComponentFixture<FilterButtonComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterButtonComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterButtonComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
