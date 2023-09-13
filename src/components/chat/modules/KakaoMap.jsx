import { memo, useCallback, useEffect, useRef, useState } from 'react';
import useThrottle from '../../../hooks/usethrottle';
import './KaKaoMap.css';
import Marker from './Marker';
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
    <S.Container>
      <S.MapContainer id="map">{!isLoading && selectedLocation && <Marker map={mapRef.current} place={selectedLocation} />}</S.MapContainer>
      <S.SearchContainer>
        <S.SearchBar>
          <S.SearchIcon>
            <HiMagnifyingGlass size={20} color={'#8f8f8f'} />
          </S.SearchIcon>
          <label className="sr-only">위치 검색</label>
          <S.LocationInput placeholder="위치를 입력해주세요" type="text" value={inputKeyword} onChange={(e) => setInputKeyword(e.target.value)} />
        </S.SearchBar>

        <S.PlaceList>
          {placesResult.map((place) => (
            <S.ListItem key={`${place.latitude},${place.longitude}`} onClick={() => setSelectLocation(place)}>
              {place.name}
            </S.ListItem>
          ))}
        </S.PlaceList>
      </S.SearchContainer>
    </S.Container>
  );
};

const MemoizedKakaoMap = memo(KakaoMap);
export default MemoizedKakaoMap;
