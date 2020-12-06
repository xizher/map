import $L from 'leaflet'

export async function createTileLayer (url, options, map) {
  const tileLayer = await $L.tileLayer(url, options || {})
  map && tileLayer.addTo(map)
  return tileLayer
}
