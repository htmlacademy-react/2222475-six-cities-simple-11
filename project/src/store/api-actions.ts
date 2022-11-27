import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {Offers, Offer} from '../types/offer';
import {
  loadOffer,
  loadOffers,
  redirectToRoute,
  setAuthorization,
  setOfferDataLoadingStatus,
  setOffersDataLoadingStatus
} from './action';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {dropToken, saveToken} from '../services/token';

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

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data: {email: userEmail, avatarUrl}} = await api.get<UserData>(APIRoute.Login);
      dispatch(setAuthorization({ AuthorizationStatus: AuthorizationStatus.Auth, email: userEmail, avatarUrl: avatarUrl }));
    } catch {
      dispatch(setAuthorization({ AuthorizationStatus: AuthorizationStatus.NoAuth }));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token, email: userEmail, avatarUrl}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(setAuthorization({ AuthorizationStatus: AuthorizationStatus.Auth, email: userEmail, avatarUrl: avatarUrl }));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setAuthorization({ AuthorizationStatus: AuthorizationStatus.NoAuth }));
  },
);
