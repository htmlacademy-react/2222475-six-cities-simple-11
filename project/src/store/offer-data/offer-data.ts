import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CITIES, DEFAULT_SORTING, NameSpace, SortCodes} from '../../const';
import {OfferData as OfferDataType} from '../../types/state';
import {fetchOffersAction, fetchOffersNearbyAction} from '../api-actions';
import {fetchOfferAction} from '../api-actions';
import {toast} from 'react-toastify';

const initialState: OfferDataType = {
  city: CITIES[0],
  offers: {
    items: [],
    fetched: false,
    loading: true,
    sort: DEFAULT_SORTING
  },
  offer: {
    data: null,
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
    },
    sortOffers: (state, action: PayloadAction<{sortCode: SortCodes}>) => {
      const {sortCode} = action.payload;
      if(sortCode !== state.offers.sort) {
        state.offers.sort = sortCode;
      }
    },
    setOfferInitialState: (state) => {
      state.offer.data = null;
      state.offer.loading = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.offers.loading = true;
        state.offers.sort = DEFAULT_SORTING;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers.items = action.payload;
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
        toast.error('Offer loading error. Try later');
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

export const {changeCity, hoverCard, sortOffers, setOfferInitialState} = offerData.actions;
