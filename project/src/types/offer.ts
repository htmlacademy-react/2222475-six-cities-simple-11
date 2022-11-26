export interface Host {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export interface OfferCity {
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  name: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface Offer {
  bedrooms: number;
  city: OfferCity;
  description: string;
  goods: [string];
  host: Host;
  id: number;
  images: [string];
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
}

export type Offers = Offer[];
