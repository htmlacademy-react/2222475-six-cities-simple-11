import React from 'react';
import {Link, Outlet, useLocation} from 'react-router-dom';
import cn from 'classnames';
import {AppRoute, AppRouteClass} from '../const';
import HeaderUser from '../components/header-user/header-user';

function Layout() {
  const { pathname } = useLocation();
  let className = '';
  if(pathname === AppRoute.Main) {
    className = AppRouteClass.Main;
  }

  return (
    <div className={cn('page', className)}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            <HeaderUser/>
          </div>
        </div>
      </header>
      <Outlet/>
    </div>
  );
}

export default Layout;
