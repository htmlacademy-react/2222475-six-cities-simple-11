import {AppRoute} from '../../const';
import {Link, useParams, Navigate} from 'react-router-dom';
import cn from 'classnames';

import {Helmet} from 'react-helmet-async';
import CommentForm from '../../components/comment-form/comment-form';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchOfferAction} from '../../store/api-actions';

function OfferPage(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const offer = useAppSelector((state) => state.offer);

  if (!params.id) {
    return <Navigate to='/404'/>;
  }

  const offerId = Number(params.id);

  dispatch(fetchOfferAction(offerId));

  if (offer.loading) {
    return (
      <div className="page">
        <Helmet>
          <title>Предложение</title>
        </Helmet>
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link className="header__logo-link" to={AppRoute.Main}>
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <div className="header__nav-profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    </div>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="/">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <main className="page__main page__main--property loader"></main>
      </div>
    );
  } else {
    if (!offer.data) {
      return <Navigate to="/404"/>;
    }

    const ratingPercent: number = offer.data.rating * 20;

    return (
      <div className="page">
        <Helmet>
          <title>Предложение</title>
        </Helmet>
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link className="header__logo-link" to={AppRoute.Main}>
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <div className="header__nav-profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    </div>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="/">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--property">
          <section className="property">
            {
              offer.data.images.length ?
                <div className="property__gallery-container container">
                  <div className="property__gallery">
                    {offer.data.images.slice(0, 6).map((image) => (
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
                    {offer.data.type}
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
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
                  <ul className="reviews__list">
                    <li className="reviews__item">
                      <div className="reviews__user user">
                        <div className="reviews__avatar-wrapper user__avatar-wrapper">
                          <img className="reviews__avatar user__avatar" src="img/avatar-max.jpg" width="54" height="54" alt="Reviews avatar"/>
                        </div>
                        <span className="reviews__user-name">Max</span>
                      </div>
                      <div className="reviews__info">
                        <div className="reviews__rating rating">
                          <div className="reviews__stars rating__stars">
                            <span style={{width: '80%'}}></span>
                            <span className="visually-hidden">Rating</span>
                          </div>
                        </div>
                        <p className="reviews__text">
                          A quiet cozy and picturesque that hides behind a a river by the unique lightness of
                          Amsterdam.
                          The building is green and from 18th century.
                        </p>
                        <time className="reviews__time" dateTime="2019-04-24">April 2019</time>
                      </div>
                    </li>
                  </ul>
                  <CommentForm/>
                </section>
              </div>
            </div>
            <section className="property__map map"></section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                <article className="near-places__card place-card">
                  <div className="near-places__image-wrapper place-card__image-wrapper">
                    <a href="/">
                      <img className="place-card__image" src="img/room.jpg" width="260" height="200" alt="Place"/>
                    </a>
                  </div>
                  <div className="place-card__info">
                    <div className="place-card__price-wrapper">
                      <div className="place-card__price">
                        <b className="place-card__price-value">&euro;80</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                      </div>
                    </div>
                    <div className="place-card__rating rating">
                      <div className="place-card__stars rating__stars">
                        <span style={{width: '80%'}}></span>
                        <span className="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <h2 className="place-card__name">
                      <a href="/">Wood and stone place</a>
                    </h2>
                    <p className="place-card__type">Private room</p>
                  </div>
                </article>

                <article className="near-places__card place-card">
                  <div className="near-places__image-wrapper place-card__image-wrapper">
                    <a href="/">
                      <img className="place-card__image" src="img/apartment-02.jpg" width="260" height="200" alt="Place"/>
                    </a>
                  </div>
                  <div className="place-card__info">
                    <div className="place-card__price-wrapper">
                      <div className="place-card__price">
                        <b className="place-card__price-value">&euro;132</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                      </div>
                    </div>
                    <div className="place-card__rating rating">
                      <div className="place-card__stars rating__stars">
                        <span style={{width: '80%'}}></span>
                        <span className="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <h2 className="place-card__name">
                      <a href="/">Canal View Prinsengracht</a>
                    </h2>
                    <p className="place-card__type">Apartment</p>
                  </div>
                </article>

                <article className="near-places__card place-card">
                  <div className="place-card__mark">
                    <span>Premium</span>
                  </div>
                  <div className="near-places__image-wrapper place-card__image-wrapper">
                    <a href="/">
                      <img className="place-card__image" src="img/apartment-03.jpg" width="260" height="200" alt="Place"/>
                    </a>
                  </div>
                  <div className="place-card__info">
                    <div className="place-card__price-wrapper">
                      <div className="place-card__price">
                        <b className="place-card__price-value">&euro;180</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                      </div>
                    </div>
                    <div className="place-card__rating rating">
                      <div className="place-card__stars rating__stars">
                        <span style={{width: '100%'}}></span>
                        <span className="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <h2 className="place-card__name">
                      <a href="/">Nice, cozy, warm big bed apartment</a>
                    </h2>
                    <p className="place-card__type">Apartment</p>
                  </div>
                </article>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

export default OfferPage;
