import ArcGISMap from 'esri/Map'
import MapView from 'esri/views/MapView'
import WebTileLayer from 'esri/layers/WebTileLayer'
import ImageryLayer from 'esri/layers/ImageryLayer'
import GroupLayer from 'esri/layers/GroupLayer'
import GraphicsLayer from 'esri/layers/GraphicsLayer'
import SimpleMarkerSymbol from 'esri/symbols/SimpleMarkerSymbol'
import SimpleLineSymbol from 'esri/symbols/SimpleLineSymbol'
import SimpleFillSymbol from 'esri/symbols/SimpleFillSymbol'

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
  },
  layers: {
    WebTileLayer,
    ImageryLayer,
    GroupLayer,
    GraphicsLayer,
  },
  symbols: {
    SimpleMarkerSymbol,
    SimpleLineSymbol,
    SimpleFillSymbol,
  },
}
