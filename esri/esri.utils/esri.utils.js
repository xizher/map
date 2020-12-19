import { esri } from '../loadmodules/loadmodules'
import { distanceFromTwoPoint } from '../../../ext/spatialalgorithms/base'

const state = {
  /** @type {import('../mapinit/mapinit').$Map} */
  map: null,
  /** @type {import('../mapinit/mapinit').$View} */
  view: null
}

export function initUtils (map, view) {
  state.map = map
  state.view = view
}

/**
 * 点集转线
 * @param {Array<import('esri/geometry/Point')>} points 点集
 * @returns {import('esri/geometry/Polyline')}
 */
export function pointsToPolyline (points) {
  const { spatialReference } = state.view
  const polyline = new esri.geometry.Polyline({ spatialReference })
  polyline.addPath([])
  points.forEach((pt, i) => polyline.insertPoint(0, i, pt))
  return polyline
}

/**
 * 点集转面
 * @param {Array<import('esri/geometry/Point')>} points 点集
 */
export function pointsToPolygon (points) {
  const { spatialReference } = state.view
  const polygon = new esri.geometry.Polygon({ spatialReference })
  polygon.addRing([])
  points.forEach((pt, i) => polygon.insertPoint(0, i, pt))
  return polygon
}

/**
 * 几何转外接圆
 * @param {import('esri/geometry/Geometry')} geometry 几何对象
 */
export function geometryToCircumcircle (geometry) {
  const { extent } = geometry
  const center = extent.center
  const { xmin, ymin, xmax, ymax } = extent
  const radius = distanceFromTwoPoint([xmin, ymax], [xmax, ymin])
  const circle = new esri.geometry.Circle({
    center, radius
  })
  return circle
}

/**
 * 屏幕坐标转地图坐标
 * @param {MouseEvent} screenPoint MouseEvent
 * @returns {import('esri/geometry/Point')}
 */
export function screenToMapPoint (screenPoint) {
  return state.view.toMap(screenPoint)
}
