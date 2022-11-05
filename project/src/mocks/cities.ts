import {Cities} from '../types/city';

export interface City {
  id: number;
  title: string;
  lat: number;
  lng: number;
  zoom: number;
}

const zoom = 11;

export const cities: Cities = [
  {
    id: 1,
    title: 'Paris',
    lat: 48.87599740362592,
    lng: 2.3123577822670107,
    zoom: zoom,
  },
  {
    id: 2,
    title: 'Cologne',
    lat: 50.94550709559888,
    lng: 6.936417121026315,
    zoom: zoom,
  },
  {
    id: 3,
    title: 'Brussels',
    lat: 50.84708319369681,
    lng: 4.34691974796495,
    zoom: zoom,
  },
  {
    id: 4,
    title: 'Amsterdam',
    lat: 52.37015943125224,
    lng: 4.846280660035498,
    zoom: zoom,
  },
  {
    id: 5,
    title: 'Hamburg',
    lat: 53.556450787236884,
    lng: 9.944295123315719,
    zoom: zoom,
  },
  {
    id: 6,
    title: 'Dusseldorf',
    lat: 51.21773151372119,
    lng: 6.782758359102845,
    zoom: zoom,
  },
];
