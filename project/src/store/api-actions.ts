import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {Offers, Offer} from '../types/offer';
import {loadOffer, loadOffers, setOfferDataLoadingStatus, setOffersDataLoadingStatus} from './action';
import {APIRoute} from '../const';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchOffers',
  async (_arg, {getState, dispatch, extra: api}) => {
    const {city, offers} = getState();
    const offersFetched = offers.fetched;
    if (!offersFetched) {
      dispatch(setOffersDataLoadingStatus(true));
      let {data} = await api.get<Offers>(APIRoute.Offers);
      data = data.filter((offer) => offer.city.name === city.title);
      dispatch(loadOffers(data));
      dispatch(setOffersDataLoadingStatus(false));
    }
  },
);

export const fetchOfferAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchOffer',
  async (offerId: number, {getState, dispatch, extra: api}) => {
    const {offer} = getState();

    if ((!offer.data || (offer.data && offerId !== offer.data.id))) {
      dispatch(setOfferDataLoadingStatus(true));
      const {data} = await api.get<Offer>(APIRoute.Offer.replace(':offerId', String(offerId)));
      dispatch(loadOffer(data));
    }
  },
);
