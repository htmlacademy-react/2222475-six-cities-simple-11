import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {offerData} from './offer-data/offer-data';
import {userProcess} from './user-process/user-process';
import {commentData} from './comment-data/comment-data';

export const rootReducer = combineReducers({
  [NameSpace.Offer]: offerData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Comment]: commentData.reducer,
});
