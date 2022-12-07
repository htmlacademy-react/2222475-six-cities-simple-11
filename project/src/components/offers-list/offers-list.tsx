import PlaceCard from '../place-card/place-card';
import {useAppSelector} from '../../hooks';
import PlacesFound from '../places-found/places-found';
import Map from '../map/map';
import {getCity, getOffers, getOffersLoadingStatus} from '../../store/offer-data/selectors';
import PlacesSort from '../places-sort/places-sort';

function OffersList(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const city = useAppSelector(getCity);
  const isOffersDataLoading = useAppSelector(getOffersLoadingStatus);

  if (isOffersDataLoading) {
    return (
      <div className="cities__places-container container">
        <div className="cities__places places loader"></div>
        <div className="cities__right-section">
          <Map/>
        </div>
      </div>
    );
  } else if (!offers.length) {
    return (
      <div className="cities__places-container cities__places-container--empty container page__main--index-empty">
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">We could not find any property available at the moment in {city.title}</p>
          </div>
        </section>
        <div className="cities__right-section"></div>
      </div>
    );
  } else {
    return (
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <PlacesFound/>
          <PlacesSort/>
          <div className="cities__places-list places__list tabs__content">
            {offers.map((offer) => (
              <PlaceCard key={offer.id} offer={offer}/>
            ))}
          </div>
        </section>
        <div className="cities__right-section">
          <Map/>
        </div>
      </div>
    );
  }
}

export default OffersList;
