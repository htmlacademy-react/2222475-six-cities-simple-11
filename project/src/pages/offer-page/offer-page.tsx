import {useParams, Navigate} from 'react-router-dom';
import cn from 'classnames';
import {Helmet} from 'react-helmet-async';
import {useAppSelector} from '../../hooks';
import {fetchOfferAction} from '../../store/api-actions';
import {useEffect} from 'react';
import {store} from '../../store';
import {getOffer} from '../../store/offer-data/selectors';
import Reviews from '../../components/reviews/reviews';
import OffersNearby from '../../components/offers-nearby/offers-nearby';
import OfferMap from '../../components/offer-map/offer-map';
import {MaxCountLimit, ROOM_TYPE} from '../../const';
import {setOfferInitialState} from '../../store/offer-data/offer-data';

function OfferPage(): JSX.Element {
  const params = useParams();
  const offer = useAppSelector(getOffer);
  const offerId = Number(params.id);

  useEffect(() => {
    store.dispatch(setOfferInitialState());
    let isMounted = true;

    if (isMounted) {
      store.dispatch(fetchOfferAction(offerId));
    }

    return () => {
      isMounted = false;
    };
  }, [offerId]);

  if (!offer || offer.loading) {
    return (
      <main className="page__main page__main--property loader"></main>
    );
  } else {
    if (!offer.data) {
      return <Navigate to="/404"/>;
    }

    const ratingPercent: number = offer.data.rating * 20;
    const offerType: string = ROOM_TYPE[offer.data.type as keyof typeof ROOM_TYPE] || '';

    return (
      <>
        <Helmet>
          <title>{offer.data.title}</title>
        </Helmet>
        <main className="page__main page__main--property">
          <section className="property">
            {
              offer.data.images.length ?
                <div className="property__gallery-container container">
                  <div className="property__gallery">
                    {offer.data.images.slice(0, MaxCountLimit.OfferImages).map((image) => (
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
                  offer.data.isPremium &&
                  <div className="property__mark"><span>Premium</span></div>
                }
                <div className="property__name-wrapper">
                  <h1 className="property__name">{offer.data.title}</h1>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${ratingPercent}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{offer.data.rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {offerType}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {offer.data.bedrooms} Bedroom{offer.data.bedrooms > 1 ? 's' : ''}
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {offer.data.maxAdults} adult{offer.data.maxAdults > 1 ? 's' : ''}
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{offer.data.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                {
                  offer.data.goods.length ?
                    <div className="property__inside">
                      <h2 className="property__inside-title">What&apos;s inside</h2>
                      <ul className="property__inside-list">
                        {offer.data.goods.map((good) => (
                          <li className="property__inside-item" key={good}>{good}</li>
                        ))}
                      </ul>
                    </div>
                    : ''
                }
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className={cn('property__avatar-wrapper', 'user__avatar-wrapper', {'property__avatar-wrapper--pro': offer.data.host.isPro})}>
                      <img className="property__avatar user__avatar" src={offer.data.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                    </div>
                    <span className="property__user-name">{offer.data.host.name}</span>
                    {
                      offer.data.host.isPro ?
                        <span className="property__user-status">Pro</span>
                        : ''
                    }
                  </div>
                  <div className="property__description">
                    <p className="property__text">{offer.data.description}</p>
                  </div>
                </div>
                <Reviews offerId={offerId}/>
              </div>
            </div>
            <OfferMap offer={offer.data}/>
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
