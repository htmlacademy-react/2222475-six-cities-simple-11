import React, {useState} from 'react';
import cn from 'classnames';
import {SortCodes, SortTypes} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {sortOffers} from '../../store/offer-data/offer-data';
import {getSortOffers} from '../../store/offer-data/selectors';

function PlacesSort() {
  const dispatch = useAppDispatch();
  const currentSortCode = useAppSelector(getSortOffers);
  const [openPopup, setOpenPopup] = useState(false);

  const currentSort = SortTypes.find((sortType) => sortType.code === currentSortCode) || SortTypes[0];

  const handleChangeSort = (evt: React.MouseEvent<HTMLLIElement, MouseEvent>, sortCode: SortCodes) => {
    evt.preventDefault();
    setOpenPopup(false);
    dispatch(sortOffers({sortCode: sortCode}));
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setOpenPopup(!openPopup)}>
        {currentSort.name}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={cn('places__options', 'places__options--custom', {'places__options--opened': openPopup})}>
        {SortTypes.map((sortType) => (
          <li
            key={sortType.code}
            className={cn('places__option', {'places__option--active': sortType.code === currentSortCode})}
            onClick={(evt) => { handleChangeSort(evt, sortType.code); }}
          >
            {sortType.name}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default PlacesSort;
