import {store} from '../store';
import {Offers as OffersType} from './offer';
import {City} from './city';

export interface StateOffer {
  items: OffersType;
  fetched: boolean;
}

export type State = {
  offers: StateOffer;
  hoverCardId: number;
  city: City;
}

export type AppDispatch = typeof store.dispatch;
