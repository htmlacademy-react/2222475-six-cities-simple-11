export interface City {
  id: number;
  title: string;
  lat: number;
  lng: number;
  zoom: number;
}

export interface Place {
  lat: number;
  lng: number;
  zoom: number;
}

export type Cities = City[];
