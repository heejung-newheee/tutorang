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
          center: position,
          level: 3, 
          marker: marker 
      }
  
      const staticMap = new kakao.maps.StaticMap(divRef.current, staticMapOption);
      staticMapRef.current = staticMap;
    })
  },[latitude,longitude])
  return (
    <div ref={divRef} className='kakaoMap-static'></div>
  )
}

export default KaKaoStaticMap
