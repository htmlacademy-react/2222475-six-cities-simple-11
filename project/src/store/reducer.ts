import {createReducer} from '@reduxjs/toolkit';
import {changeCity, fetchOffers, hoverCard} from './action';
import {CITIES} from '../const';
import {offers as offersMock} from '../mocks/offers';
import {State as StateType} from '../types/state';

const initialState: StateType = {
  offers: {
    items: [],
    fetched: false,
  },
  hoverCardId: 0,
  city: CITIES[0]
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const {cityId} = action.payload;

      state.city = CITIES.find((cityData) => cityData.id === cityId) || CITIES[0];
      state.offers.items = offersMock.filter((offer) => offer.cityId === cityId);
    })
    .addCase(fetchOffers, (state) => {
      if(!state.offers.fetched) {
        state.offers.items = offersMock.filter((offer) => offer.cityId === state.city.id);
        state.offers.fetched = true;
      }
    })
    .addCase(hoverCard, (state, action) => {
      const {id} = action.payload;
      state.hoverCardId = id;
    });
});

export {reducer};
