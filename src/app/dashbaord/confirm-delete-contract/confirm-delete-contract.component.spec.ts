import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteContractComponent } from './confirm-delete-contract.component';

describe('ConfirmDeleteContractComponent', () => {
  let component: ConfirmDeleteContractComponent;
  let fixture: ComponentFixture<ConfirmDeleteContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
