import { Injectable } from '@angular/core';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor() { }

  getCompaines(): Company[] {
    return [
      {name: 'Company A', email: 'companyA@ssw.com.au', phone: 1234},
      {name: 'Company B', email: 'companyB@ssw.com.au', phone: 5678},
      {name: 'Company C', email: 'companyC@ssw.com.au', phone: 9133},
    ];
  }

}
