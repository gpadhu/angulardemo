import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { EmblDataService } from '../_services/embl-data.service';
import { TranscriptSearch } from '../_models/transcript-search';
import { Transcript } from '../_models/transcript';

@Component({
  selector: 'embl-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.css']
})

export class MainSearchComponent {
  private allTranscripts: Transcript[] = [];
  private filteredTranscripts: Transcript[] = [];
  private searchFormData: TranscriptSearch;
  private notFound: boolean = false;

  constructor(private emblDataService: EmblDataService) { }

  searchTranscripts(searchForm: TranscriptSearch) {
    this.searchFormData = searchForm;
 
    this.emblDataService.getAllTranscripts(searchForm.gene).pipe(
      switchMap((geneData)=> {
        let proteinSequenceIDs = this.getTranscriptsAndProteinSequenceIds(geneData);
        return this.emblDataService.getProteinSequences(proteinSequenceIDs);
      }))
      .subscribe((sequenceData)=> this.searchInProteinSequence(sequenceData), (error)=> this.showError());
  }

  getTranscriptsAndProteinSequenceIds(data) : string[] {
    this.allTranscripts = data['Transcript'].filter((transcript: Transcript) => transcript['Translation']);
    return this.allTranscripts.map((transcript: Transcript)=> transcript.Translation.id);
  }

  searchInProteinSequence(sequenceData: string) {
    //serialize sequences into individual sequence to map with transcripts using linebreaks;
    let protienSquences = sequenceData.replace( /\n/g, " " ).split( " " );
    protienSquences.pop(); // remove additional at the end

    this.filteredTranscripts = [];

    let matchedSequences = protienSquences.map((seq)=> seq[this.searchFormData.position-1] == this.searchFormData.amino_acid);
    matchedSequences.forEach((match, index)=> {
      if(match) { this.filteredTranscripts.push(this.allTranscripts[index]) }
    })

    if (this.filteredTranscripts.length === 0) { this.showError()};
  }

  searchTranscriptsFromHgvs(hgvsNotation: string) {
    let [hgvsNotationFromUser, proteinId, version,
    type, amino_acid, position, amino_acid_variant] = this.parseHgvsNotation(hgvsNotation);
    
    this.emblDataService.getHgvsNotationVariants(hgvsNotationFromUser).pipe(
      switchMap((hgvsVariants) => {
     
        let variantsTranscripts = this.getVariantsTranscripts(hgvsVariants, Number(position), amino_acid);
        return this.emblDataService.getTranscriptsfromIds(variantsTranscripts)        
      }))
      .subscribe((transcripts: any) => {
        this.filteredTranscripts = Object.values(transcripts);
      }, (error) => this.showError()
    );
  }

  getVariantsTranscripts(hgvsVariants, position, amino_acid) {
    //assuming amino_acids values will be First letter, eg., for Valine it will be V
    let variants = hgvsVariants[0];

    let variantsAtPosition = variants.transcript_consequences.filter((variant) =>
    variant.protein_start == position && variant.amino_acids.indexOf(amino_acid[0]) > -1 )
 
    let variantsTranscripts = variantsAtPosition.map((variant)=> variant.transcript_id);

    return variantsTranscripts;
  }

  parseHgvsNotation(hgvsNotation) {
    let hgvsPattern = /([A-Z]{4}[\d]{11})\.([\d]+)\:([a-z])\.([A-Z][a-z]{2})(\d+)([A-Z][a-z]{2})/
    let matches = hgvsPattern.exec(hgvsNotation);
    return matches;
  }

  showError() {
    this.notFound = true;
  }

  resetError() {
    this.notFound = false;
  }

}
