import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../state';
import * as companyActions from '../state/company/actions';
import { CompanyState } from '../state/company/reducer';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api';


  constructor(
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) {
    this.loadCompanies();
  }

  loadCompanies() {
    this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    .pipe(
      catchError(e => this.errorHandler(e)),
      finalize(() => console.log('Complete')),
      tap(t => console.log('loaded some companies', t))
    ).subscribe(list => this.store.dispatch(companyActions.setCompanies({companies: list})));
  }

  getCompanies(): Observable<Company[]> {
    return this.store.select(s => s.company.companies)
    .pipe(tap(t => console.log('getCompanies value', t)));
  }

  deleteCompany(company: Company) {
    this.httpClient.delete<Company>(`${this.API_BASE}/company/${company.id}`)
    .subscribe(c => this.loadCompanies());
  }

  addCompany(company: Company) {
    this.httpClient.post<Company>(`${this.API_BASE}/company`, company,
    { headers: new HttpHeaders().set('content-type', 'application/json')})
    .subscribe(c => this.loadCompanies());
  }

  getCompany(companyId: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${companyId}`);
  }

  updateCompany(company: Company) {
    this.httpClient.put<Company>(`${this.API_BASE}/company/${company.id}`, company,
    { headers: new HttpHeaders().set('content-type', 'application/json')})
    .subscribe(c => this.loadCompanies());
  }


  errorHandler(e: Error): Observable<any> {
    console.error('ERROR HANDLER', e);
    return new Observable();
  }
}
