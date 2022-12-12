import {Cities} from './types/city';
import {Sorts} from './types/offer';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Room = '/offer/:id',
}

export enum NameSpace {
  Offer = 'OFFER',
  User = 'USER',
  Comment = 'COMMENT',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Offers = '/hotels',
  Offer = '/hotels/:offerId',
  NearbyOffers = '/hotels/:offerId/nearby',
  Comments = '/comments/:offerId',
  Login = '/login',
  Logout = '/logout',
}

export const URL_MARKER_DEFAULT = '/img/pin.svg';
export const URL_MARKER_ACTIVE = '/img/pin-active.svg';

const START_ZOOM = 13;

export const CITIES: Cities = [
  {
    id: 1,
    title: 'Paris',
    lat: 48.85661,
    lng: 2.351499,
    zoom: START_ZOOM,
  },
  {
    id: 2,
    title: 'Cologne',
    lat: 50.938361,
    lng: 6.959974,
    zoom: START_ZOOM,
  },
  {
    id: 3,
    title: 'Brussels',
    lat: 50.846557,
    lng: 4.351697,
    zoom: START_ZOOM,
  },
  {
    id: 4,
    title: 'Amsterdam',
    lat: 52.37454,
    lng: 4.897976,
    zoom: START_ZOOM,
  },
  {
    id: 5,
    title: 'Hamburg',
    lat: 53.550341,
    lng: 10.000654,
    zoom: START_ZOOM,
  },
  {
    id: 6,
    title: 'Dusseldorf',
    lat: 51.225402,
    lng: 6.776314,
    zoom: START_ZOOM,
  },
];

export const ROOM_TYPE = {
  house: 'House',
  apartment: 'Apartment',
  room: 'Private Room',
  hotel: 'Hotel',
};

export enum SortCodes {
  Popular = 'POPULAR',
  PriceToHigh = 'PRICE_TO_HIGH',
  PriceToLow = 'PRICE_TO_LOW',
  TopRated = 'TOP_RATED',
}

export const DEFAULT_SORTING = SortCodes.Popular;

export const SORT_TYPES: Sorts = [
  {
    code: SortCodes.Popular,
    name: 'Popular',
  },
  {
    code: SortCodes.PriceToHigh,
    name: 'Price: low to high',
  },
  {
    code: SortCodes.PriceToLow,
    name: 'Price: high to low',
  },
  {
    code: SortCodes.TopRated,
    name: 'Top rated first',
  },
];

export const PASSWORD_VALID_ERROR = 'Password must contain at least one letter and one number';

export const enum CommentSize {
  MinLength = 50,
  MaxLength = 300,
}

export const enum MaxCountLimit {
  OfferImages = 6,
  Comments = 10,
  OfferNearby = 3,
}
