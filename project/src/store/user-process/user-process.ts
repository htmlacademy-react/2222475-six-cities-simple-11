import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus} from '../../const';
import {UserProcess} from '../../types/state';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';
import {UserDataInitialState} from '../../types/user-data';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: UserDataInitialState
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{email: string; avatarUrl: string}>) => {
      const { email, avatarUrl } = action.payload;
      state.user.email = email || '';
      state.user.avatarUrl = avatarUrl || '';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});

export const {setUser} = userProcess.actions;
