import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CITIES, NameSpace} from '../../const';
import {OfferData as OfferDataType} from '../../types/state';
import {fetchOffersAction, fetchReviewsAction, fetchOffersNearbyAction} from '../api-actions';
import {fetchOfferAction} from '../api-actions';
import {toast} from 'react-toastify';

const initialState: OfferDataType = {
  city: CITIES[0],
  offers: {
    items: [],
    fetched: false,
    loading: true
  },
  offer: {
    data: null,
    loading: true
  },
  offerComments: {
    items: [],
    loading: true
  },
  offersNearby: {
    items: [],
    loading: true
  },
  hoverCardId: 0,
};

export const offerData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<{cityId: number}>) => {
      const {cityId} = action.payload;
      state.city = CITIES.find((cityData) => cityData.id === cityId) || CITIES[0];
      state.offers.fetched = false;
    },
    hoverCard: (state, action: PayloadAction<{id: number}>) => {
      const {id} = action.payload;
      state.hoverCardId = id;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.offers.loading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        const data = action.payload;
        state.offers.items = data.filter((offer) => offer.city.name === state.city.title);
        state.offers.fetched = true;
        state.offers.loading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offers.loading = false;
        toast.error('Offers loading error. Try later');
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.offer.loading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer.data = action.payload;
        state.offer.loading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.offer.loading = false;
        toast.error('Offer loading error. Try later');
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.offerComments.items = [];
        state.offerComments.loading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.offerComments.items = action.payload;
        state.offerComments.loading = false;
      })
      .addCase(fetchOffersNearbyAction.pending, (state) => {
        state.offersNearby.items = [];
        state.offersNearby.loading = true;
      })
      .addCase(fetchOffersNearbyAction.fulfilled, (state, action) => {
        state.offersNearby.items = action.payload;
        state.offersNearby.loading = false;
      });
  }
});

export const {changeCity, hoverCard} = offerData.actions;
