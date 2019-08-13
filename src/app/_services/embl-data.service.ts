import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmblDataService {
  private species: string = 'homo_sapiens';
  private baseUrl: string = 'http://rest.ensembl.org';
  public symbolLookupUrl: string = `${this.baseUrl}/lookup/symbol/${this.species}/`;
  public sequenceLookupUrl: string = `${this.baseUrl}/sequence/id`;
  public hgvsNotationUrl: string = `${this.baseUrl}/vep/human/hgvs/`;
  public idsLookupUrl: string = `${this.baseUrl}/lookup/id`
  private params = new HttpParams().set('expand', '1');

  constructor(private http: HttpClient) { }

  getAllTranscripts(gene: string) {
    return this.http.get(this.symbolLookupUrl+gene, { params: this.params});
  }

  getProteinSequences(ids: string[]) {
    // using responseType to stop default HttpClient json parsing
    return this.http.post(this.sequenceLookupUrl, { ids: ids }, { responseType: 'text'});
  }

  getHgvsNotationVariants(hgvsNotation: string) {
    return this.http.get(this.hgvsNotationUrl + hgvsNotation);
  }

  getTranscriptsfromIds(ids: string) {
    return this.http.post(this.idsLookupUrl, {ids: ids})
  }

}
