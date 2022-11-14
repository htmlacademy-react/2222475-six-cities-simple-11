import cn from 'classnames';
import {CITIES} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeCity} from '../../store/action';

function CitiesList(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCityId = useAppSelector((state) => state.cityId);

  const handleChangeCity = (cityId: number) => {
    if(cityId !== currentCityId) {
      dispatch(changeCity({cityId}));
    }
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          CITIES.map((city) => (
            <li className="locations__item" key={city.id}>
              <a className={cn('locations__item-link', 'tabs__item', {'tabs__item--active': city.id === currentCityId})} onClick={() => handleChangeCity(city.id)} href='#'>
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
