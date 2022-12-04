import {createAction} from '@reduxjs/toolkit';
import {AppRoute, AuthorizationStatus} from '../const';

export const redirectToRoute = createAction<AppRoute>('main/redirectToRoute');

export const setAuthorization = createAction<{
  AuthorizationStatus: AuthorizationStatus;
  email?: string;
  avatarUrl?: string;
}>('user/setAuthorization');
