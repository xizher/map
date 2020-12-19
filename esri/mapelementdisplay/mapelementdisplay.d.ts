import { $Map, $View } from "../mapinit/mapinit";
import Graphic from 'esri/Graphic'
import Geometry from 'esri/geometry/Geometry'
import Symbol from 'esri/symbols/Symbol'

export declare class MapElementDisplay {
  constructor (map: $Map, view: $View)
  /** 添加图元（保留已有图元基础上） */
  addGraphics (graphics: Graphic | Array<Graphic>) : this
  /** 清理所有图元 */
  clearGraphics () : this
  /** 清理指定图元 */
  removeGraphics (graphics: Graphic | Array<Graphic>) : this
  /** 设置图元（清空已有图元基础上） */
  setGraphics (graphics: Graphic | Array<Graphic>) : this
  /** 添加过渡图元（保留已有过渡图元基础上） */
  addTempGraphics (graphics: Graphic | Array<Graphic>) : this
  /** 清理所有过渡图元 */
  clearTempGraphics () : this
  /** 清理指定过渡图元 */
  removeTempGraphics (graphics: Graphic | Array<Graphic>) : this
  /** 设置过渡图元（清空已有过渡图元基础上） */
  setTempGraphics (graphics: Graphic | Array<Graphic>) : this
  /** 清理所有图元（包括普通和过渡的图元） */
  clear () : this
  /** 解析图元 */
  parseGraphics (geometrys: Geometry | Array<Geometry>, symbolOptions?: Symbol) : Graphic | Array<Graphic>
}