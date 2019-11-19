import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Subscription, Observable } from 'rxjs';
import { takeWhile, tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companies$: Observable<Company[]>;

  constructor(
    private companyService: CompanyService
  ) {}

  ngOnInit() {
    this.companies$ = this.companyService.getCompanies()
    .pipe(
      tap(c => console.log('Got company list', c)),
      finalize(() => console.log('FINALIZE CALLED IN COMPONENT'))
    );
  }

  // ngOnInit() {
  //   let component = this;
  //   this.companyService.getCompaines()
  //     .subscribe(
  //       function(next) { component.companies = next; }
  //     );
  // }



}
