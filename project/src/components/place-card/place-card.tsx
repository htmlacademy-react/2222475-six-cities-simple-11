import {Offer as OfferType} from '../../types/offer';
import {Link} from 'react-router-dom';

type OfferProps = {
  offer: OfferType;
  handleCardOver: (id: number) => void;
  handleCardOut: () => void;
}

function PlaceCard({offer, handleCardOver, handleCardOut}: OfferProps): JSX.Element {
  const ratingPercent: number = offer.rating * 20;

  return (
    <article className="cities__card place-card" onMouseEnter={() => handleCardOver(offer.id)} onMouseLeave={handleCardOut}>
      {
        offer.premium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.mainPicture.src} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price.cost}</b>
            <span className="place-card__price-text">&#47;&nbsp;{offer.price.period}</span>
          </div>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${ratingPercent}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
