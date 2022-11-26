import React, {useRef, useEffect, useState} from 'react';
import leaflet, {Layer} from 'leaflet';
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
      const markerList: Layer[] = [];
      offers.forEach((offer: OfferType) => {
        const marker = leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === hoverCardId)
              ? currentCustomIcon
              : defaultCustomIcon,
          });
        markerList.push(marker);
        map.addLayer(marker);
      });

      return () => {
        if(markerList.length) {
          markerList.forEach((marker) => {
            map.removeLayer(marker);
          });
        }
      };
    }
  }, [map, offers, hoverCardId, city]);


  return (
    <section className="cities__map map" ref={mapRef}>
    </section>
  );
}

export default Map;
