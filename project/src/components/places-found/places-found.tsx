import {useAppSelector} from '../../hooks';
import React from 'react';
import {getCity, getOffers} from '../../store/offer-data/selectors';

function PlacesFound(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const city = useAppSelector(getCity);

  return (
    <b className="places__found">{ `${String(offers.length)} places to stay in ${city.title}` }</b>
  );
}

export default PlacesFound;
