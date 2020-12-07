import $L from 'leaflet'

export async function createTileLayer (url, options, map) {
  const tileLayer = await $L.tileLayer(url, options || {})
  map && tileLayer.addTo(map)
  return tileLayer
}

export function createCircleMarker ([lon, lat], options, map) {
  const marker = $L.circleMarker($L.latLng(lat, lon), options || {})
  map && marker.addTo(map)
  return marker
}

