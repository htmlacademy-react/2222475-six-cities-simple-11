import {Helmet} from 'react-helmet-async';
import OffersList from '../../components/offers-list/offers-list';
import CitiesList from '../../components/cities-list/cities-list';
import {useEffect} from 'react';
import {store} from '../../store';
import {fetchOffersAction} from '../../store/api-actions';
import {useAppSelector} from '../../hooks';
import {getCity} from '../../store/offer-data/selectors';

function MainPage(): JSX.Element {
  const city = useAppSelector(getCity);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      store.dispatch(fetchOffersAction());
    }

    return () => {
      isMounted = false;
    };
  }, [city]);

  return (
    <>
      <Helmet>
        <title>Шесть городов</title>
      </Helmet>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList/>
        </div>
        <div className="cities">
          <OffersList/>
        </div>
      </main>
    </>
  );
}

export default MainPage;
