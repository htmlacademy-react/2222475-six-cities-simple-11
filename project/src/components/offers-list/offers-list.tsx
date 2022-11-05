import PlaceCard from '../place-card/place-card';
import {Offers as OffersType} from '../../types/offer';

type OffersListProps = {
  offers: OffersType;
  handleCardOver: (id: number) => void;
  handleCardOut: () => void;
}

function OffersList({offers, handleCardOver, handleCardOut}: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard handleCardOver={(id: number)=>handleCardOver(id)} handleCardOut={handleCardOut} key={offer.id} offer={offer}/>
      ))}
    </div>
  );
}

export default OffersList;
