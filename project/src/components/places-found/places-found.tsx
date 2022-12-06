import {useAppSelector} from '../../hooks';
import React from 'react';
import {getCity, getOffersCount} from '../../store/offer-data/selectors';

function PlacesFound(): JSX.Element {
  const offersCount = useAppSelector(getOffersCount);
  const city = useAppSelector(getCity);

  return (
    <b className="places__found">{ `${String(offersCount)} places to stay in ${city.title}` }</b>
  );
}

export default PlacesFound;
