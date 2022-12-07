import {store} from '../store';
import {Offers as OffersType, Offer as OfferType} from './offer';
import {Comments as CommentsType} from './comment';
import {City} from './city';
import {AuthorizationStatus} from '../const';
import {UserData} from './user-data';

export type Nullable<T> = T | null;

export interface StateOffers {
  items: OffersType;
  fetched?: boolean;
  loading: boolean;
}

export interface StateOfferComments {
  items: CommentsType;
  loading: boolean;
}

export interface StateOffer {
  data: Nullable<OfferType>;
  loading: boolean;
}

export type OfferData = {
  offers: StateOffers;
  offer: StateOffer;
  offerComments: StateOfferComments;
  offersNearby: StateOffers;
  hoverCardId: number;
  city: City;
}

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserData;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
