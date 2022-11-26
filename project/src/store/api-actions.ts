import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {Offers, Offer} from '../types/offer';
import {loadOffer, loadOffers, setOfferDataLoadingStatus, setOffersDataLoadingStatus} from './action';
import {APIRoute} from '../const';
import {useRef} from 'react';

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
      dispatch(setOffersDataLoadingStatus(false));
      dispatch(loadOffers(data));
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
    const isFetchedOfferRun = useRef(false);

    if ((!offer.data || (offer.data && offerId !== offer.data.id)) && !isFetchedOfferRun.current) {
      isFetchedOfferRun.current = true;
      dispatch(setOfferDataLoadingStatus(true));
      const {data} = await api.get<Offer>(APIRoute.Offer.replace(':offerId', String(offerId)));
      dispatch(setOfferDataLoadingStatus(false));
      dispatch(loadOffer(data));
      isFetchedOfferRun.current = false;
    }
  },
);
