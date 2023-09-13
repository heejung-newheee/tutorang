import {useEffect} from 'react'

const { kakao } = window

const Marker = ({ map, place }) => {
    useEffect(() => {
      const markerPosition = new kakao.maps.LatLng(place.latitude, place.longitude);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        clickable: true,
      });
      marker.setMap(map);
      const infoWindow = new kakao.maps.InfoWindow({
        position : markerPosition, 
        content : `<div class='bAddr'>${place.name}</div>` 
      });
      infoWindow.open(map,marker)
      return () => {
        marker.setMap(null)
        infoWindow.close()
      };
    }, [map, place]);
  
    return null;
  }

export default Marker