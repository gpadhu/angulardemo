import { Component, Input } from '@angular/core';
import { Transcript } from '../../../_models/transcript';

@Component({
  selector: 'embl-transcript-item',
  templateUrl: './transcript-item.component.html',
  styleUrls: ['./transcript-item.component.css']
})
export class TranscriptItemComponent {
  @Input() transcript : Transcript;

  constructor() { }

}
