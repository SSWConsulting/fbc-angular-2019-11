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
    this.companies$ = this.loadCompanies();
  }

  deleteCompany(company: Company) {
    console.log('Delete Button Clicked');
    this.companyService.deleteCompany(company);
  }

  loadCompanies() {
    return this.companyService.getCompanies()
    .pipe(
      tap(c => console.log('Got company list', c)),
      finalize(() => console.log('FINALIZE CALLED IN COMPONENT'))
    );
  }


}
