import {DEFAULT_SORTING, NameSpace, SortCodes} from '../../const';
import {Nullable, State, StateOffer} from '../../types/state';
import {Offers} from '../../types/offer';
import {City} from '../../types/city';

export const getOffers = (state: State): Offers => {
  let items = state[NameSpace.Offer].offers.items;
  items = items.filter((offer) => offer.city.name === state[NameSpace.Offer].city.title);
  switch(state[NameSpace.Offer].offers.sort) {
    case SortCodes.PriceToHigh:
      items.sort((a, b) => a.price - b.price);
      break;
    case SortCodes.PriceToLow:
      items.sort((a, b) => b.price - a.price);
      break;
    case SortCodes.TopRated:
      items.sort((a, b) => b.rating - a.rating);
      break;
    default:
      items.sort((a, b) => a.id - b.id);
  }
  return items;
};
export const getOffersLoadingStatus = (state: State): boolean => state[NameSpace.Offer].offers.loading;

export const getOffer = (state: State): Nullable<StateOffer> => state[NameSpace.Offer].offer;

export const getCity = (state: State): City => state[NameSpace.Offer].city;
export const getHoverCardId = (state: State): number => state[NameSpace.Offer].hoverCardId;

export const getOffersNearby = (state: State): Offers => state[NameSpace.Offer].offersNearby.items;
export const getSortOffers = (state: State): SortCodes => state[NameSpace.Offer].offers.sort || DEFAULT_SORTING;
