import PlaceCard from '../place-card/place-card';
import {useAppSelector} from '../../hooks';

function OffersList(): JSX.Element {
  const offers = useAppSelector((state) => state.offers.items);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard key={offer.id} offer={offer}/>
      ))}
    </div>
  );
}

export default OffersList;
