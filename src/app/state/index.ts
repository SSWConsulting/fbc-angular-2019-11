import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { CompanyState, companyReducer } from './company/reducer';
import * as fromCompany from './company/actions';


export interface AppState {
  company: CompanyState;
}

export const reducers: ActionReducerMap<AppState> = {
  company: companyReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const AllEffects = [
];
