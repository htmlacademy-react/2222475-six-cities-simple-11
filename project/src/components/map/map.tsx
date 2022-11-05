import React, {useRef, useEffect} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map/use-map';
import {City} from '../../types/city';
import {Offers as OffersType, Offer as OfferType} from '../../types/offer';
import {URL_MARKER_DEFAULT, URL_MARKER_ACTIVE} from '../../const';

type MapProps = {
  city: City;
  offers: OffersType;
  hoverCardId: number;
}

function Map({city, offers, hoverCardId}: MapProps) {
  const mapRef: React.MutableRefObject<null> = useRef(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [27, 39],
    iconAnchor: [13, 39],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_ACTIVE,
    iconSize: [27, 39],
    iconAnchor: [13, 39],
  });

  useEffect(() => {
    if (map) {
      offers.forEach((offer: OfferType) => {
        leaflet
          .marker({
            lat: offer.location.lat,
            lng: offer.location.lng,
          }, {
            icon: (offer.id === hoverCardId)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, offers, hoverCardId]);


  return (
    <section className="cities__map map" ref={mapRef}>
    </section>
  );
}

export default Map;
