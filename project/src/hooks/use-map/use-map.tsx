import React, {useEffect, useState, useRef} from 'react';
import {Place} from '../../types/city';
import leaflet, {Map as MapType} from 'leaflet';

function useMap(mapRef: React.MutableRefObject<null>, place: Place) {
  const [map, setMap] = useState<MapType | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance: MapType = leaflet.map(mapRef.current, {
        center: {
          lat: place.lat,
          lng: place.lng,
        },
        zoom: place.zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, place]);

  return map;
}

export default useMap;
