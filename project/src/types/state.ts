import {store} from '../store';
import {Offers as OffersType, Offer as OfferType} from './offer';
import {City} from './city';

type Nullable<T> = T | null;

export interface StateOffers {
  items: OffersType;
  fetched: boolean;
  loading: boolean;
}

export interface StateOffer {
  data: Nullable<OfferType>;
  loading: boolean;
}

export type State = {
  offers: StateOffers;
  hoverCardId: number;
  city: City;
  offer: StateOffer;
}

export type AppDispatch = typeof store.dispatch;
