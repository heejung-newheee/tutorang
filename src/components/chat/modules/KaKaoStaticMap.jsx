import React, { useEffect, useRef } from 'react'

const { kakao } = window

const KaKaoStaticMap = ({latitude, longitude}) => {
  const divRef = useRef(null)
  const staticMapRef = useRef(null)
  useEffect(() => {
    kakao.maps.load(function () {
      const position = new kakao.maps.LatLng(latitude, longitude); 
      const marker = {
          position
      }
      const staticMapOption = { 
          center: position, // 이미지 지도의 중심좌표
          level: 3, // 이미지 지도의 확대 레벨
          marker: marker // 이미지 지도에 표시할 마커 
      }
  
      const staticMap = new kakao.maps.StaticMap(divRef.current, staticMapOption);
      staticMapRef.current = staticMap;
    })
  },[latitude,longitude])
  return (
    <div ref={divRef} style={{width:'200px',height:'150px'}}></div>
  )
}

export default KaKaoStaticMap
