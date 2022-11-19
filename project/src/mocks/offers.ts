import {Offers as OffersType} from '../types/offer';

export const offers: OffersType = [
  {
    id: 1,
    cityId: 4,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    premium: true,
    mainPicture: {
      src: 'img/apartment-01.jpg'
    },
    price: {
      cost: 120,
      period: 'night'
    },
    rating: 4,
    location: {
      lat: 52.3909553943508,
      lng: 4.85309666406198
    }
  },
  {
    id: 2,
    cityId: 4,
    title: 'Wood and stone place',
    type: 'Private room',
    premium: false,
    mainPicture: {
      src: 'img/room.jpg'
    },
    price: {
      cost: 80,
      period: 'night'
    },
    rating: 4,
    location: {
      lat: 52.3609553943508,
      lng: 4.85309666406198
    }
  },
  {
    id: 3,
    cityId: 4,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    premium: false,
    mainPicture: {
      src: 'img/apartment-02.jpg'
    },
    price: {
      cost: 132,
      period: 'night'
    },
    rating: 4,
    location: {
      lat: 52.3909553943508,
      lng: 4.929309666406198
    }
  },
  {
    id: 4,
    cityId: 4,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    premium: true,
    mainPicture: {
      src: 'img/apartment-03.jpg'
    },
    price: {
      cost: 180,
      period: 'night'
    },
    rating: 5,
    location: {
      lat: 52.3809553943508,
      lng: 4.939309666406198
    }
  },
  {
    id: 5,
    cityId: 1,
    title: 'Beautiful french place',
    type: 'Apartment',
    premium: true,
    mainPicture: {
      src: 'img/apartment-01.jpg'
    },
    price: {
      cost: 55,
      period: 'night'
    },
    rating: 4,
    location: {
      lat: 48.892252379008795,
      lng: 2.3710659684166906
    }
  },
  {
    id: 6,
    cityId: 1,
    title: 'Wood french kiss place',
    type: 'Private room',
    premium: false,
    mainPicture: {
      src: 'img/room.jpg'
    },
    price: {
      cost: 88,
      period: 'night'
    },
    rating: 3,
    location: {
      lat: 48.871481195026846,
      lng: 2.177088628214533
    }
  },
];
