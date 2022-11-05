export interface MainPicture {
  src: string;
}

export interface Price {
  cost: number;
  period: string;
}

export interface Offer {
  id: number;
  title: string;
  type: string;
  premium: boolean;
  mainPicture: MainPicture;
  price: Price;
  rating: number;
}

export type Offers = Offer[];
