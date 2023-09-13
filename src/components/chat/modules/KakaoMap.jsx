import { memo, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useThrottle from '../../../hooks/usethrottle';
import './KaKaoMap.css';
const { kakao } = window;

const KakaoMap = ({ onChange }) => {
  const mapRef = useRef(null);
  const placesRef = useRef(null);
  const geocoderRef = useRef(null);
  const [isLoading, setLoading] = useState(true);
  const [inputKeyword, setInputKeyword] = useState('');
  const [selectedLocation, setSelectLocation] = useState(null);
  const [placesResult, setPlacesResult] = useState([]);
  const debouncedValue = useThrottle(inputKeyword, 1000);

  function moveMap(lat, lon) {
    const moveLatLon = new kakao.maps.LatLng(lat, lon);
    mapRef.current.panTo(moveLatLon);
  }

  const searchPlaces = useCallback((keyword) => {
    if (!placesRef.current) return;

    placesRef.current.keywordSearch(
      keyword,
      (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const result = data.map((place) => ({
            name: place.place_name,
            longitude: place.x,
            latitude: place.y,
          }));
          setPlacesResult(result);
        } else {
          setPlacesResult([]);
        }
      },
      { size: 10 },
    );
  }, []);

  function searchAddrFromCoords(coords, callback) {
    // 좌표로 행정동 주소 정보를 요청합니다
    if (!geocoderRef.current) return;
    geocoderRef.current.coord2Address(coords.getLng(), coords.getLat(), callback);
  }

  useEffect(() => {
    const mouseClickEventHandler = (mouseEvent) => {
      searchAddrFromCoords(mouseEvent.latLng, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          if (result.length > 0)
            setSelectLocation({
              name: result[0].address.address_name,
              latitude: mouseEvent.latLng.getLat(),
              longitude: mouseEvent.latLng.getLng(),
            });
        }
      });
    };

    kakao.maps.load(() => {
      const container = document.getElementById('map');
      const position = new kakao.maps.LatLng(36.48211492948262, 127.7762755344892);
      const options = {
        center: position,
        level: 13,
      };

      if (mapRef.current) return;
      const map = new kakao.maps.Map(container, options);
      const places = new kakao.maps.services.Places();
      const geocoder = new kakao.maps.services.Geocoder();
      mapRef.current = map;
      placesRef.current = places;
      geocoderRef.current = geocoder;
      kakao.maps.event.addListener(map, 'click', mouseClickEventHandler);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!selectedLocation) return;
    moveMap(selectedLocation.latitude, selectedLocation.longitude);
    if (typeof onChange === 'function') onChange(selectedLocation);
  }, [selectedLocation, onChange]);

  useEffect(() => {
    if (!debouncedValue.replace(/^\s+|\s+$/g, '')) return;
    searchPlaces(debouncedValue);
  }, [debouncedValue, searchPlaces]);

  return (
    <Container>
      <MapContainer id="map" style={{}}>
        {!isLoading && selectedLocation && <Marker map={mapRef.current} place={selectedLocation} />}
      </MapContainer>
      <SearchContainer>
        <input placeholder="검색어를 입력하세요" type="text" value={inputKeyword} onChange={(e) => setInputKeyword(e.target.value)} style={{ fontSize: '1rem', padding: '6px 10px', border: 'none', borderRadius: '10px', backgroundColor: '#eee' }} />
        <ul style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem', overflowY: 'auto' }}>
          {placesResult.map((place) => (
            <ListItem key={`${place.latitude},${place.longitude}`} onClick={() => setSelectLocation(place)}>
              {place.name}
            </ListItem>
          ))}
        </ul>
      </SearchContainer>
    </Container>
  );
};

const MemoizedKakaoMap = memo(KakaoMap);
export default MemoizedKakaoMap;

const Container = styled.div`
  display: flex;
  gap: 1rem;
  height: 300px;
  @media screen and (max-width: 768px) {
    height: auto;
    overflow: hidden;
    flex-direction: column;
    flex: 1;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 10px;
`;

const ListItem = styled.li`
  padding: 10px;
  border-radius: 10px;
  &:hover,
  &:focus,
  &:focus-within {
    background-color: #eeeeee81;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    overflow: hidden;
    flex: 1;
  }
`;

const Marker = ({ map, place }) => {
  useEffect(() => {
    const markerPosition = new kakao.maps.LatLng(place.latitude, place.longitude);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      clickable: true,
    });
    marker.setMap(map);
    const infoWindow = new kakao.maps.InfoWindow({
      position: markerPosition,
      content: `<div class='bAddr'>${place.name}</div>`,
    });
    infoWindow.open(map, marker);
    return () => {
      marker.setMap(null);
      infoWindow.close();
    };
  }, [map, place]);

  return null;
};
