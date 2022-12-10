import cn from 'classnames';
import React, {useEffect} from 'react';
import {store} from '../../store';
import {fetchOffersNearbyAction} from '../../store/api-actions';
import {useAppSelector} from '../../hooks';
import {getOffersNearby} from '../../store/offer-data/selectors';
import NearPlace from '../near-place/near-place';

type NearbyProps = {
  offerId: number;
}

function OffersNearby({offerId}: NearbyProps): JSX.Element {
  const offers = useAppSelector(getOffersNearby);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      store.dispatch(fetchOffersNearbyAction(offerId));
    }

    return () => {
      isMounted = false;
    };
  }, [offerId]);

  return (
    <section className={cn('near-places', 'places', {'d-none': offers.length})}>
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offers.slice(0, 3).map((offer) => (
          <NearPlace key={offer.id} offer={offer}/>
        ))}
      </div>
    </section>
  );
}

export default OffersNearby;
