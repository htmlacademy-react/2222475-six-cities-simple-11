import {useAppSelector} from '../../hooks';
import {City} from '../../types/city';
import {CITIES} from '../../const';
import React from 'react';

function PlacesFound(): JSX.Element {
  const offersCount = useAppSelector((state) => state.offers.items.length);
  const currentCityId = useAppSelector((state) => state.cityId);
  const city: City | undefined = CITIES.find((cityData) => cityData.id === currentCityId);

  return (
    <b className="places__found">{ city ? `${offersCount} places to stay in ${city.title}` : '' }</b>
  );
}

export default PlacesFound;
