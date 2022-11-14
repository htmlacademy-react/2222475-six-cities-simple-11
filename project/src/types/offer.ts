export interface MainPicture {
  src: string;
}

export interface Price {
  cost: number;
  period: string;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Offer {
  id: number;
  cityId: number;
  title: string;
  type: string;
  premium: boolean;
  mainPicture: MainPicture;
  price: Price;
  rating: number;
  location: Location;
}

export type Offers = Offer[];
