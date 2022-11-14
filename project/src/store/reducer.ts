import {createReducer} from '@reduxjs/toolkit';
import {changeCity, fetchOffers, hoverCard} from './action';
import {DEFAULT_CITY_ID} from '../const';
import {offers as offersMock} from '../mocks/offers';
import {State as StateType} from '../types/state';

const initialState: StateType = {
  offers: {
    items: [],
    fetched: false,
  },
  hoverCardId: 0,
  cityId: DEFAULT_CITY_ID,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const {cityId} = action.payload;
      state.cityId = cityId;
      state.offers.items = offersMock.filter((offer) => offer.cityId === state.cityId);
    })
    .addCase(fetchOffers, (state) => {
      if(!state.offers.fetched) {
        state.offers.items = offersMock.filter((offer) => offer.cityId === state.cityId);
        state.offers.fetched = true;
      }
    })
    .addCase(hoverCard, (state, action) => {
      const {id} = action.payload;
      state.hoverCardId = id;
    });
});

export {reducer};
