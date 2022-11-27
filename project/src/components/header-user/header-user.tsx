import React from 'react';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Link} from 'react-router-dom';
import {logoutAction} from '../../store/api-actions';
import CSS from 'csstype';

function HeaderUser(): JSX.Element {
  const currentAuthorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logoutAction());
  };

  const headerAvatar: CSS.Properties = {
    backgroundImage: `url(${user.avatarUrl})`
  };

  if (currentAuthorizationStatus === AuthorizationStatus.Auth) {
    return (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <div className="header__nav-profile">
              <div className="header__avatar-wrapper user__avatar-wrapper" style={headerAvatar}></div>
              <span className="header__user-name user__name">{user.email}</span>
            </div>
          </li>
          <li className="header__nav-item">
            <a className="header__nav-link" onClick={handleLogout} href="/">
              <span className="header__signout">Sign out</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default HeaderUser;
