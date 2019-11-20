import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyService } from './company/company.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'fbc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'firebootcamp-crm';
  date = new Date();

  companyCount$: Observable<number>;

  constructor(private companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.companyCount$ = this.companyService.getCompanies()
    .pipe(
      map(list => list.length)
    );

  }

  // titleChanged(e: KeyboardEvent) {
  //   this.title = (e.target as HTMLInputElement).value;
  // }

  // titleChanged(e) {
  //   this.title = e.target.value;
  // }

}
