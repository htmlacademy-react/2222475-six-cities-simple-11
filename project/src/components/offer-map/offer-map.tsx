import React, {useRef, useEffect} from 'react';
import leaflet, {Layer} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map/use-map';
import {Offer as OfferType} from '../../types/offer';
import {URL_MARKER_DEFAULT, URL_MARKER_ACTIVE} from '../../const';
import {useAppSelector} from '../../hooks';
import {getOffersNearby} from '../../store/offer-data/selectors';
import {Place as PlaceType} from '../../types/city';

type OfferMapProps = {
  offer: OfferType;
}

function OfferMap({offer}: OfferMapProps): JSX.Element {
  const offersNearby = useAppSelector(getOffersNearby);
  const mapRef: React.MutableRefObject<null> = useRef(null);
  const place: PlaceType = {
    lat: offer.location.latitude,
    lng: offer.location.longitude,
    zoom: offer.location.zoom - 2
  };
  const map = useMap(mapRef, place);

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
      const markerList: Layer[] = [];

      const mainMarker = leaflet
        .marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        }, {
          icon: currentCustomIcon,
        });
      markerList.push(mainMarker);
      map.addLayer(mainMarker);

      offersNearby.forEach((offerNearby: OfferType) => {
        const marker = leaflet
          .marker({
            lat: offerNearby.location.latitude,
            lng: offerNearby.location.longitude,
          }, {
            icon: defaultCustomIcon,
          });
        markerList.push(marker);
        map.addLayer(marker);
      });

      return () => {
        if (markerList.length) {
          markerList.forEach((marker) => {
            map.removeLayer(marker);
          });
        }
      };
    }
  }, [map, offersNearby, currentCustomIcon, defaultCustomIcon, offer.location.longitude, offer.location.latitude]);


  return (
    <section className="property__map map" ref={mapRef}>
    </section>
  );
}

export default OfferMap;
