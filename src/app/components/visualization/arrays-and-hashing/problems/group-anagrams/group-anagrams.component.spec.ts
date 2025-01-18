import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAnagramsComponent } from './group-anagrams.component';

describe('GroupAnagramsComponent', () => {
  let component: GroupAnagramsComponent;
  let fixture: ComponentFixture<GroupAnagramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupAnagramsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupAnagramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
