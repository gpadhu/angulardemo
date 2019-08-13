import { Component, Input } from '@angular/core';
import { Transcript } from '../../_models/transcript';

@Component({
  selector: 'embl-transcripts-list',
  templateUrl: './transcripts-list.component.html',
  styleUrls: ['./transcripts-list.component.css']
})
export class TranscriptsListComponent {
  @Input() transcripts : Transcript[];
  @Input() notFound : boolean = false;

  constructor(){}
}
