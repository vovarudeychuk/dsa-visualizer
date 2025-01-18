import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncodeAndDecodeStringsComponent } from './encode-and-decode-strings.component';

describe('EncodeAndDecodeStringsComponent', () => {
  let component: EncodeAndDecodeStringsComponent;
  let fixture: ComponentFixture<EncodeAndDecodeStringsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncodeAndDecodeStringsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncodeAndDecodeStringsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
