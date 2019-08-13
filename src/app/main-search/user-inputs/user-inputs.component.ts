import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'embl-user-inputs',
  templateUrl: './user-inputs.component.html',
  styleUrls: ['./user-inputs.component.css']
})
export class UserInputsComponent implements OnInit {
  public searchForm: FormGroup;
  public hgvsForm: FormGroup;
  @Output() transcriptSearched = new EventEmitter();
  @Output() hgvsSearched = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      gene: ['', Validators.required],
      position: [null, Validators.required],
      amino_acid: ['', Validators.maxLength(1)]
    });

    this.hgvsForm = this.formBuilder.group({
      hgvs : ['', Validators.required]
    })
   }

  ngOnInit() {
    this.hgvsForm.valueChanges.subscribe((d) => this.submitHgVsForm())
  }

  submitTranscriptForm() {
    if( this.searchForm.valid ) {
      let formData = this.searchForm.value;
      formData['amino_acid'] = this.searchForm.value.amino_acid.toUpperCase();
      this.transcriptSearched.emit(formData);
    }
  }

  submitHgVsForm() {
    if( this.hgvsForm.valid ) {
      this.hgvsSearched.emit(this.hgvsForm.value.hgvs)
    }
  }

}
