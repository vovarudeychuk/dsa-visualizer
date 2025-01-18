import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOfArrayExceptSelfComponent } from './product-of-array-except-self.component';

describe('ProductOfArrayExceptSelfComponent', () => {
  let component: ProductOfArrayExceptSelfComponent;
  let fixture: ComponentFixture<ProductOfArrayExceptSelfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductOfArrayExceptSelfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductOfArrayExceptSelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
