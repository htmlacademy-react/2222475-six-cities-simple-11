import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {Offers, Offer} from '../types/offer';
import {APIRoute, NameSpace} from '../const';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {setUser} from './user-process/user-process';
import {dropToken, saveToken} from '../services/token';
import {Comments} from '../types/comment';

export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferAction = createAsyncThunk<Offer, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchOffer',
  async (offerId: number, {extra: api}) => {
    const {data} = await api.get<Offer>(APIRoute.Offer.replace(':offerId', String(offerId)));
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<Comments, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchReviews',
  async (offerId: number, {extra: api}) => {
    const {data} = await api.get<Comments>(APIRoute.Comments.replace(':offerId', String(offerId)));
    return data;
  },
);

export const fetchOffersNearbyAction = createAsyncThunk<Offers, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchOffersNearby',
  async (offerId: number, {extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.NearbyOffers.replace(':offerId', String(offerId)));
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data: {email: userEmail, avatarUrl}} = await api.get<UserData>(APIRoute.Login);
    dispatch(setUser({email: userEmail, avatarUrl: avatarUrl}));
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
    dispatch(setUser({email: userEmail, avatarUrl: avatarUrl}));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const sendCommentAction = createAsyncThunk<Comments, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/sendCommentAction',
  async (offerId, {getState, extra: api}) => {
    const comment = getState()[NameSpace.Comment].comment;
    const {data} = await api.post<Comments>(APIRoute.Comments.replace(':offerId', String(offerId)), {comment: comment.comment, rating: comment.rating});
    return data;
  },
);
