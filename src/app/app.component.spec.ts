import { AppComponent } from './app.component';
import { of } from 'rxjs';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyService } from './company/company.service';
import { DebugElement } from '@angular/core';

import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyTableComponent } from './company/company-table/company-table.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './state';
import { metaReducers } from './state/index';
import {By} from '@angular/platform-browser';



describe(`Component: App Component`, () => {
  it('should add 1+1', () => {
        expect(1 + 1).toEqual(2);
  });

  it(`title equals 'Angular Superpowers'`, () => {
    const component = new AppComponent(null);
    expect(component.title).toEqual('firebootcamp-crm');
  });
});


describe('service mocking', () => {

  let component;
  let companySvc;

  beforeEach(() => {
    companySvc = {
      getCompanies: () => of([{
        name: 'Fake Company',
        email : 'fakeEmail@ssw.com.au',
        number: 12345,
      }])
    };
    component = new AppComponent(companySvc);
  });


  it(`companyCount = 1`, () => {
    component.ngOnInit();
    component.companyCount$.subscribe(c => {
      expect(c).toEqual(1);
    });
  });

});



describe('mock with SpyOn', () => {

  let component;
  let companySvc;

  beforeEach(() => {
    companySvc = {
      getCompanies: () => {}
    };
    component = new AppComponent(companySvc);
  });

  it(`companyCount = 2`, () => {
    spyOn(companySvc, 'getCompanies').and.returnValue(of([
      {
        name: 'Fake Company A',
        email: 'fakeEmail@ssw.com.au',
        number: 12345
      },
      {
        name: 'Fake Company B',
        email: 'fakeEmail@ssw.com.au',
        number: 12345
      }
    ]));
    component.ngOnInit();
    component.companyCount$.subscribe(c => {
      expect(c).toEqual(2);
    });
  });

});




describe('testBed Tests', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let companySvc;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CompanyListComponent,   // Our routing module needs it
        CompanyTableComponent,  // Our routing module needs it
        CompanyEditComponent,   // Our routing module needs it
        NotFoundComponent
      ],
      imports: [
        AppRoutingModule, // Routerlink in AppComponent needs it
        HttpClientModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducers, {
          metaReducers,
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true
          }
        }),
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    companySvc = TestBed.get(CompanyService);

  });


  it(`companyCount = 1`, () => {

    expect(companySvc).not.toBeNull();

    spyOn(companySvc, 'getCompanies').and.returnValue(of([
      {
        name: 'Fake Company C',
        email: 'fakeEmail@ssw.com.au',
        phone: 12345,
        id: 123
      }
    ]));
    fixture.detectChanges();

    expect(component.companyCount$.subscribe(c => {
      expect(c).toEqual(1);
    }));

    let el = fixture.debugElement.query(By.css('#company-count')).nativeElement;
    expect(el.textContent).toEqual('1');
  });

});


