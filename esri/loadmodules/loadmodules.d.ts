import ArcGISMap from 'esri/Map'
import MapView from 'esri/views/MapView'
import SceneView from 'esri/views/SceneView'
import WebTileLayer from 'esri/layers/WebTileLayer'
import ImageryLayer from 'esri/layers/ImageryLayer'
import GroupLayer from 'esri/layers/GroupLayer'
import GraphicsLayer from 'esri/layers/GraphicsLayer'
import SimpleMarkerSymbol from 'esri/symbols/SimpleMarkerSymbol'
import SimpleLineSymbol from 'esri/symbols/SimpleLineSymbol'
import SimpleFillSymbol from 'esri/symbols/SimpleFillSymbol'
import Point from 'esri/geometry/Point'
import Polyline from 'esri/geometry/Polyline'
import Polygon from 'esri/geometry/Polygon'
import Circle from 'esri/geometry/Circle'
import Extent from 'esri/geometry/Extent'
import FeatureLayer from 'esri/layers/FeatureLayer'

// declare class $GroupLayer extends GroupLayer {}

/**
 * 加载ESRI模块
 */
export declare function loadEsriModules () : Promise<void>

/**
 * ESRI模块库
 */
export declare const esri = {
  Map: ArcGISMap,
  views: {
    MapView,
    SceneView,
  },
  layers: {
    WebTileLayer,
    ImageryLayer,
    GroupLayer,
    GraphicsLayer,
    FeatureLayer,
  },
  symbols: {
    SimpleMarkerSymbol,
    SimpleLineSymbol,
    SimpleFillSymbol,
  },
  geometry: {
    Point,
    Polyline,
    Polygon,
    Circle,
    Extent,
  },
}
