import {HelmetProvider} from 'react-helmet-async';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import {Offers as OffersType} from '../../types/offer';

type AppScreenProps = {
  cardsCount: number;
  offers: OffersType;
}

function App({cardsCount, offers}: AppScreenProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<MainPage cardsCount={cardsCount} offers={offers}/>}/>
          <Route path={AppRoute.Login} element={<LoginPage/>}/>
          <Route path={AppRoute.Room} element={<OfferPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
