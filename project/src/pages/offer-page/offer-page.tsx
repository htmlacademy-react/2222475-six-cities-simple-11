import {useParams, Navigate} from 'react-router-dom';
import cn from 'classnames';
import {Helmet} from 'react-helmet-async';
import {useAppSelector} from '../../hooks';
import {fetchOfferAction} from '../../store/api-actions';
import {useEffect} from 'react';
import {store} from '../../store';
import {getOffer, getOfferLoadingStatus} from '../../store/offer-data/selectors';
import Reviews from '../../components/reviews/reviews';
import OffersNearby from '../../components/offers-nearby/offers-nearby';
import OfferMap from '../../components/offer-map/offer-map';
import {ROOM_TYPE} from '../../const';

function OfferPage(): JSX.Element {
  const params = useParams();
  const offer = useAppSelector(getOffer);
  const offerLoading = useAppSelector(getOfferLoadingStatus);
  const offerId = Number(params.id);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      store.dispatch(fetchOfferAction(offerId));
    }

    return () => {
      isMounted = false;
    };
  }, [offerId]);

  if (offerLoading) {
    return (
      <main className="page__main page__main--property loader"></main>
    );
  } else {
    if (!offer) {
      return <Navigate to="/404"/>;
    }

    const ratingPercent: number = offer.rating * 20;
    const offerType: string = ROOM_TYPE[offer.type as keyof typeof ROOM_TYPE] || '';

    return (
      <>
        <Helmet>
          <title>{offer.title}</title>
        </Helmet>
        <main className="page__main page__main--property">
          <section className="property">
            {
              offer.images.length ?
                <div className="property__gallery-container container">
                  <div className="property__gallery">
                    {offer.images.slice(0, 6).map((image) => (
                      <div className="property__image-wrapper" key={image}>
                        <img className="property__image" src={image} alt="studio"/>
                      </div>
                    ))}
                  </div>
                </div>
                : ''
            }
            <div className="property__container container">
              <div className="property__wrapper">
                {
                  offer.isPremium &&
                  <div className="property__mark"><span>Premium</span></div>
                }
                <div className="property__name-wrapper">
                  <h1 className="property__name">{offer.title}</h1>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${ratingPercent}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{offer.rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {offerType}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {offer.bedrooms} Bedroom{offer.bedrooms > 1 ? 's' : ''}
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {offer.maxAdults} adult{offer.maxAdults > 1 ? 's' : ''}
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{offer.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                {
                  offer.goods.length ?
                    <div className="property__inside">
                      <h2 className="property__inside-title">What&apos;s inside</h2>
                      <ul className="property__inside-list">
                        {offer.goods.map((good) => (
                          <li className="property__inside-item" key={good}>{good}</li>
                        ))}
                      </ul>
                    </div>
                    : ''
                }
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className={cn('property__avatar-wrapper', 'user__avatar-wrapper', {'property__avatar-wrapper--pro': offer.host.isPro})}>
                      <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                    </div>
                    <span className="property__user-name">{offer.host.name}</span>
                    {
                      offer.host.isPro ?
                        <span className="property__user-status">Pro</span>
                        : ''
                    }
                  </div>
                  <div className="property__description">
                    <p className="property__text">{offer.description}</p>
                  </div>
                </div>
                <Reviews offerId={offerId}/>
              </div>
            </div>
            <OfferMap offer={offer}/>
          </section>
          <div className="container">
            <OffersNearby offerId={offerId}/>
          </div>
        </main>
      </>
    );
  }
}

export default OfferPage;
