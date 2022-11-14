import {store} from '../store';
import {Offers as OffersType} from './offer';

export interface StateOffer {
  items: OffersType;
  fetched: boolean;
}

export type State = {
  offers: StateOffer;
  hoverCardId: number;
  cityId: number;
}

export type AppDispatch = typeof store.dispatch;
