import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyTableComponent implements OnInit {

  @Input()
  companies: Company[];

  @Output()
  deleteCompanyClicked: EventEmitter<Company> = new EventEmitter<Company>();

  constructor() { }

  ngOnInit() {
  }

  deleteCompany(company: Company) {
    this.deleteCompanyClicked.emit(company);
  }

  logChange() {
    console.log('CHANGE DETECTED');
  }

}
