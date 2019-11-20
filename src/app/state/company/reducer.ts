import { createReducer, on, Action} from '@ngrx/store';
import * as companyActions from './actions';
import { Company } from 'src/app/company/company';

export class CompanyState {
  companies: Company[];
}
export const initialState: CompanyState = {
  companies: []
} as CompanyState;

const reducer = createReducer(initialState,
  on(companyActions.setCompanies, (state, action) => {
    return { companies: action.companies };
  })
);
export function companyReducer(state: CompanyState | undefined, action: Action) {
  return reducer(state, action);
}
