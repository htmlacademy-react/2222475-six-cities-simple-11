import {useAppSelector} from '../../hooks';
import React from 'react';

function PlacesFound(): JSX.Element {
  const offersCount = useAppSelector((state) => state.offers.items.length);
  const city = useAppSelector((state) => state.city);

  return (
    <b className="places__found">{ city ? `${offersCount} places to stay in ${city.title}` : '' }</b>
  );
}

export default PlacesFound;
