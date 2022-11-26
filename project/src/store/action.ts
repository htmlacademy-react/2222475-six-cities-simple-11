import {createAction} from '@reduxjs/toolkit';
import {Offers, Offer} from '../types/offer';

export const changeCity = createAction<{ cityId: number }>('offer/changeCity');

export const hoverCard = createAction<{ id: number }>('offer/hoverCard');

export const setOffersDataLoadingStatus = createAction<boolean>('offer/setOffersDataLoadingStatus');

export const setOfferDataLoadingStatus = createAction<boolean>('offer/setOfferDataLoadingStatus');

export const loadOffer = createAction<Offer>('offer/loadOffer');

export const loadOffers = createAction<Offers>('offer/loadOffers');
