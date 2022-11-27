import {createReducer} from '@reduxjs/toolkit';
import {
  changeCity,
  hoverCard, loadOffer,
  loadOffers, setAuthorization,
  setOfferDataLoadingStatus,
  setOffersDataLoadingStatus
} from './action';
import {AuthorizationStatus, CITIES} from '../const';
import {State as StateType} from '../types/state';

const initialState: StateType = {
  city: CITIES[0],
  offers: {
    items: [],
    fetched: false,
    loading: true
  },
  hoverCardId: 0,
  offer: {
    data: null,
    loading: true
  },
  authorizationStatus: AuthorizationStatus.Unknown,
  user: {
    id: 0,
    email: '',
    avatarUrl: '../img/avatar.svg',
    token: ''
  }
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const {cityId} = action.payload;
      state.city = CITIES.find((cityData) => cityData.id === cityId) || CITIES[0];
      state.offers.fetched = false;
    })
    .addCase(hoverCard, (state, action) => {
      const {id} = action.payload;
      state.hoverCardId = id;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.offers.loading = action.payload;
    })
    .addCase(setOfferDataLoadingStatus, (state, action) => {
      state.offer.loading = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers.items = action.payload;
      state.offers.fetched = true;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer.data = action.payload;
      state.offer.loading = false;
    })
    .addCase(setAuthorization, (state, action) => {
      const { AuthorizationStatus: AuthorizationStatusValue, email, avatarUrl } = action.payload;
      state.authorizationStatus = AuthorizationStatusValue;
      state.user.email = email || '';
      state.user.avatarUrl = avatarUrl || '';
    });
});

export {reducer};
