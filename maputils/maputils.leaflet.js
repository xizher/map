import $L from 'leaflet'

/**
 * 克隆图层对象
 * @param {$L.Layer} layer 克隆的图层对象
 */
export function cloneLayer (layer) {

  const options = cloneOptions(layer.options)

  if (layer instanceof $L.SVG) {
    return $L.svg(options)
  }
  if (layer instanceof $L.Canvas) {
    return $L.Canvas(options)
  }
  if (layer instanceof $L.TileLayer.WMS) {
    return $L.tileLayer.wms(layer._url, options)
  }
  if (layer instanceof $L.TileLayer) {
    return $L.tileLayer(layer._url, options)
  }
  if (layer instanceof $L.ImageOverlay) {
    return $L.imageOverlay(layer._url, layer._bounds, options)
  }
  if (layer instanceof $L.Marker) {
    return $L.marker(layer.getLatLng(), options)
  }
  if (layer instanceof $L.Circle) {
    return $L.circle(layer.getLatLng(), layer.getRadius(), options)
  }
  if (layer instanceof $L.CircleMarker) {
    return $L.circleMarker(layer.getLatLng(), options)
  }
  if (layer instanceof $L.Rectangle) {
    return $L.rectangle(layer.getBounds(), options)
  }
  if (layer instanceof $L.Polygon) {
    return $L.polygon(layer.getLatLngs(), options)
  }
  if (layer instanceof $L.Polyline) {
    return $L.polyline(layer.getLatLngs(), options)
  }
  if (layer instanceof $L.GeoJSON) {
    return $L.geoJson(layer.toGeoJSON(), options)
  }
  if (layer instanceof $L.FeatureGroup) {
    return $L.featureGroup(cloneLayerGroup(layer))
  }
  if (layer instanceof $L.LayerGroup) {
    return $L.layerGroup(cloneLayerGroup(layer))
  }

  throw 'Unknown layer, cannot clone this layer. Leaflet-version: ' + $L.version


  /**
   * 克隆图层配置
   * @param {$L.LayerOptions} options 图层配置
   */
  function cloneOptions (options) {
    const opt = {}
    for (const key in options) {
      const val = options[key]
      if (val && val.clone) {
        opt[key] = val.clone()
      } else if (val instanceof $L.Layer) {
        opt[key] = cloneLayer(val)
      } else {
        opt[key] = val
      }
    }
    return opt
  }


  /**
   * 克隆图层组
   * @param {$L.LayerGroup} layerGroup 图层组
   */
  function cloneLayerGroup (layerGroup) {
    const layers = []
    layerGroup.eachLayer(lyr => {
      layers.push(cloneLayer(lyr))
    })
    return layers
  }
}
