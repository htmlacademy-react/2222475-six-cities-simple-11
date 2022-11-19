import {createAction} from '@reduxjs/toolkit';

export const changeCity = createAction<{cityId: number }>('offer/changeCity');

export const fetchOffers = createAction('offer/fetchOffers');

export const hoverCard = createAction<{id: number }>('offer/hoverCard');
