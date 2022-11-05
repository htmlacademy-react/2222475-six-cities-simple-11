import {Offers} from '../types/offer';

export const offers: Offers = [
  {
    id: 1,
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
  },
  {
    id: 2,
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
  },
  {
    id: 3,
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
  },
  {
    id: 4,
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
  },
];
