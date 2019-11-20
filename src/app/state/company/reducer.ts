import { createReducer, on, Action} from '@ngrx/store';
import * as companyActions from './actions';
import { Company } from 'src/app/company/company';

export class CompanyState {
  companies: Company[];
}

export const initialState: CompanyState = {
  companies: []
} as CompanyState;

export const companyReducer = createReducer(initialState,

  on(companyActions.setCompanies, (state, action) => {
    return { companies: action.companies };
  })

);

export function reducer(state: CompanyState | undefined, action: Action) {
  return companyReducer(state, action);
}
