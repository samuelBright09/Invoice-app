import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModalComponentComponent } from './delete-modal-component.component';

describe('DeleteModalComponentComponent', () => {
  let component: DeleteModalComponentComponent;
  let fixture: ComponentFixture<DeleteModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteModalComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
