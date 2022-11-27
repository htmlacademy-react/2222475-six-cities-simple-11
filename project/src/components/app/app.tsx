import {HelmetProvider} from 'react-helmet-async';
import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import Layout from '../../layouts';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={AppRoute.Main} element={<MainPage/>}/>
          <Route path={AppRoute.Room} element={<OfferPage/>}/>
        </Route>
        <Route path={AppRoute.Login} element={<LoginPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
