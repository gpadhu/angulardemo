import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptItemComponent } from './transcript-item.component';

describe('TranscriptItemComponent', () => {
  let component: TranscriptItemComponent;
  let fixture: ComponentFixture<TranscriptItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscriptItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscriptItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
