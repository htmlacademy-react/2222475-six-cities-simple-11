import cn from 'classnames';
import React from 'react';
import {CITIES} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeCity} from '../../store/offer-data/offer-data';
import {getCity} from '../../store/offer-data/selectors';

function CitiesList(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(getCity);

  const handleChangeCity = (e: React.MouseEvent<HTMLAnchorElement>, cityId: number) => {
    e.preventDefault();
    if(cityId !== currentCity.id) {
      dispatch(changeCity({cityId}));
    }
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          CITIES.map((city) => (
            <li className="locations__item" key={city.id}>
              <a className={cn('locations__item-link', 'tabs__item', {'tabs__item--active': city.id === currentCity.id})} onClick={(e) => handleChangeCity(e,city.id)} href='/'>
                <span>{ city.title }</span>
              </a>
            </li>)
          )
        }
      </ul>
    </section>
  );
}

export default CitiesList;
