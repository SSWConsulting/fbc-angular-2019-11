import { AppComponent } from './app.component'
import { of } from 'rxjs';

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


