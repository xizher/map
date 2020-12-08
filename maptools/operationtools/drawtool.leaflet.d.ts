import $L from 'leaflet'
import { $Map } from '../../mapinit/mapinit.leaflet';
import { BaseTool } from '../basetool.leaflet';

/** 绘图控制器 */
export declare class Drawer {

  /**
   * 构造函数
   * @param map leaflet 地图对象
   */
  constructor (map: $Map)

  /**
   * 添加图元
   * @param path 图元
   */
  add (path: $L.Path) : void
  
  /**
   * 设置图元
   * @param path 图元
   */
  set (path: $L.Path) : void

  /**
   * 设置绘制中的图元
   * @param path 图元
   */
  setTempGraphic (path: $L.Path) : void

  /**
   * 清除指定图元，无指定则清除所有
   * @param path 图元
   */
  remove (path) : void

  /** 清空所有图元 */
  clear () : void

  /**
   * 设置图元样式
   * @param style 图元样式
   */
  setDrawedStyle (style: $L.PathOptions) : void

  /**
   * 设置绘制过程中的图元样式
   * @param style 图元样式
   */
  setDrawingStyle (style: $L.PathOptions) : void


}

/** 绘图操作 */
export declare class DrawOperations {

  /**
   * 构造函数
   * @param drawTool 绘图工具
   */
  constructor (drawTool: DrawTool)

  /**
   * 设置绘图类型
   * @param drawtype 绘图类型
   */
  setDrawType (drawtype: 'Point' | 'Line' | 'Polyline' | 'Polygon' | 'Rectangle') : void 

  /** 清除绘图状态 */
  clearDrawType () : void

  /**
   * 
   * @param drawTool 绘图工具
   */
  static Point (drawTool: DrawTool) : void

  /**
   * 
   * @param drawTool 绘图工具
   */
  static Line (drawTool: DrawTool) : void
  
  /**
   * 
   * @param drawTool 绘图工具
   */
  static Polyline (drawTool: DrawTool) : void
  
  /**
   * 
   * @param drawTool 绘图工具
   */
  static Polygon (drawTool: DrawTool) : void
  
  /**
   * 
   * @param drawTool 绘图工具
   */
  static Rectangle (drawTool: DrawTool) : void

}

/** 绘图工具 */
export declare class DrawTool extends BaseTool {

  /**
   * 构造函数
   * @param map leaflet 地图对象
   * @param drawer 绘图控制器
   */
  constructor (map: $Map, drawer: Drawer)

  /** 绘图控制器 */
  drawer: Drawer

  /**
   * 设置绘图类型
   * @param drawtype 绘图类型
   */
  setDrawType (drawtype: 'Point' | 'Line' | 'Polyline' | 'Polygon' | 'Rectangle') : void

}
