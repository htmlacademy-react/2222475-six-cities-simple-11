import React, {useRef, useEffect, useState} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map/use-map';
import {Offer as OfferType} from '../../types/offer';
import {URL_MARKER_DEFAULT, URL_MARKER_ACTIVE} from '../../const';
import {useAppSelector} from '../../hooks';


function Map() {
  const hoverCardId = useAppSelector((state) => state.hoverCardId);
  const offers = useAppSelector((state) => state.offers.items);
  const city = useAppSelector((state) => state.city);
  const mapRef: React.MutableRefObject<null> = useRef(null);
  const [currentCityId, setCurrentCityId] = useState<number>(city.id);
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
      if(city.id !== currentCityId) {
        map.flyTo([city.lat, city.lng], city.zoom);
        setCurrentCityId(city.id);
      }

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
  }, [map, offers, hoverCardId, city]);


  return (
    <section className="cities__map map" ref={mapRef}>
    </section>
  );
}

export default Map;
