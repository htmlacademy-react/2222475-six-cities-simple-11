import PlaceCard from '../place-card/place-card';
import {useAppSelector} from '../../hooks';
import PlacesFound from '../places-found/places-found';
import Map from '../map/map';

function OffersList(): JSX.Element {
  const offers = useAppSelector((state) => state.offers.items);
  const city = useAppSelector((state) => state.city);
  if(!offers.length) {
    return (
      <div className="cities__places-container cities__places-container--empty container page__main--index-empty">
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">We could not find any property available at the moment in { city.title }</p>
          </div>
        </section>
        <div className="cities__right-section"></div>
      </div>
    );
  }
  else {
    return (
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <PlacesFound/>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
              Popular
              <svg className="places__sorting-arrow" width="7" height="4">
                <use xlinkHref="#icon-arrow-select"></use>
              </svg>
            </span>
            <ul className="places__options places__options--custom">
              <li className="places__option places__option--active" tabIndex={0}>Popular</li>
              <li className="places__option" tabIndex={0}>Price: low to high</li>
              <li className="places__option" tabIndex={0}>Price: high to low</li>
              <li className="places__option" tabIndex={0}>Top rated first</li>
            </ul>
          </form>
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
