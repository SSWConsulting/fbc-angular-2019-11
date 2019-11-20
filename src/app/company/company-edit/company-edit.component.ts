import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeWhile, debounceTime } from 'rxjs/operators';
import { CompanyService } from '../company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  isNewCompany: boolean;
  companyId: number;
  companyForm: FormGroup;

  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.companyId = this.activatedRoute.snapshot.params.id;
    this.isNewCompany = !this.companyId;


    // Equivalent
    // this.companyForm = new FormGroup({
    //   name: new FormControl('', Validators.required),
    //   email: new FormControl('@ssw.com.au'),
    //   phone: new FormControl()
    // });

    this.companyForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['@ssw.com.au'],
        phone: []
      }
    );

    if (!this.isNewCompany) {
      this.companyService.getCompany(this.companyId)
      .subscribe(company => this.companyForm.patchValue(company,
        // Suppress the valueChanges emission
        {emitEvent: false}));
    }
  }

  saveCompany() {
    if (this.isNewCompany) {
      const newCompany: Company = this.companyForm.value as Company;
      this.companyService.addCompany(newCompany);
    } else {
      const updatedCompany: Company = {...this.companyForm.value, id: this.companyId};
      this.companyService.updateCompany(updatedCompany);
    }
    this.router.navigateByUrl('/company/list');
  }


}
