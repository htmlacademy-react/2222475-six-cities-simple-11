export type UserData = {
  id: number;
  email: string;
  avatarUrl: string;
  token: string;
};

export const UserDataInitialState: UserData = {
  id: 0,
  email: '',
  avatarUrl: '../img/avatar.svg',
  token: ''
};
