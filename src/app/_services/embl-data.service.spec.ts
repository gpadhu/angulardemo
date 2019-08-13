import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmblDataService } from './embl-data.service';

describe('EmblDataService', () => {
  let gene: string = 'HRAF';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmblDataService]
    });
  });


  it('should return gene results from api', inject([EmblDataService, HttpTestingController], (emblService: EmblDataService, httpMock: HttpTestingController) => {
    emblService.getAllTranscripts('HRAF').subscribe((data: any)=> {
      expect(data.object_type).toBe('Gene');
    });

    const request = httpMock.expectOne(emblService.symbolLookupUrl + gene +'?expand=1');
    expect(request.request.method).toBe('GET');
  })

});
