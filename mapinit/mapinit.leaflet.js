import $L from 'leaflet'
import { Basemap } from '../basemap/basemap.leaflet'


export class WebMap {
  constructor (divId, mapConfig) {

    //#region 私有变量
    const _divId = divId
    /**
     * 地图配置项
     * @type {$L.MapOptions}
     */
    const _mapOptions = {
      preferCanvas: false, // 是否应在Canvas渲染器上渲染路径，否则使用SVG
      //#region 控制
      attributionControl: false, // 是否将归因控件添加到地图
      zoomControl: false, // 是否将缩放控件添加到地图
      //#endregion
      //#region 交互
      closePopupOnClick	:	true,	// 如果不希望在用户单击地图时关闭弹出窗口，可以设置为 。false
      zoomSnap	:	1,	// 强制地图的缩放级别始终为倍数，尤其是在拟合（） 或捏合缩放之后。默认情况下，缩放级别捕捉到最接近的整数;较低的值（例如 或 ） 允许更大的粒度。值 表示缩放级别在缩小或捏合缩放后不会被捕捉。0.50.10fitBounds
      zoomDelta	:	1,	// 控制缩放（）、缩放输出（）、按压或键盘上或使用缩放控件后，地图的缩放级别将发生多大变化。小于 （例如） 的值允许更大的粒度。+-10.5
      trackResize	:	true,	// 地图是否自动处理浏览器窗口大小以更新自身。
      boxZoom	:	true,	// 地图是否可以缩放到通过拖动鼠标时按移位键指定的矩形区域。
      doubleClickZoom	:	true,	// 地图是否可以通过双击放大地图，并在保持移位时通过双击进行缩小。如果通过，双击缩放将缩放到视图的中心，无论鼠标位于什么位置。'center'
      dragging	:	true,	// 地图是否可用鼠标/触摸拖动。
      //#endregion
      //#region 地图状态
      crs: $L.CRS.EPSG3857, // 地图坐标系
      center: [0, 0], // 地图初始中心
      zoom: 1, // 缩放等级
      // minZoom: null, maxZoom: null, // 最大/最小缩放等级
      maxBounds: null, // 地图范围控制
      //#endregion
      //#region 动画
      zoomAnimation	:	true,	// 是否启用地图缩放动画。默认情况下，它在所有支持 CSS3 转换的浏览器中启用，但 Android 除外。
      zoomAnimationThreshold	:	4,	// 如果缩放差异超过此值，则不会为缩放设置动画。
      fadeAnimation	:	true,	// 是否启用磁贴淡入淡出动画。默认情况下，它在所有支持 CSS3 转换的浏览器中启用，但 Android 除外。
      markerZoomAnimation	:	true,	// 标记是否使用缩放动画为缩放动画，如果禁用，它们将在动画长度中消失。默认情况下，它在所有支持 CSS3 转换的浏览器中启用，但 Android 除外。
      //#endregion
      //#region 平移惯性
      inertiaDeceleration	:	3000,	// 惯性运动减速的速率（以像素/秒2为单位）。
      inertiaMaxSpeed	:	Infinity,	// 惯性运动的最大速度，以像素/秒为单位。
      easeLinearity	:	0.2,
      worldCopyJump	:	false,	// 启用此选项后，地图可在平移到世界的另一个"副本"时进行跟踪，并无缝跳转到原始副本，以便所有叠加（如标记和矢量图层）仍然可见。
      maxBoundsViscosity	:	0.0,	// 如果已设置，则此选项将控制拖动地图时边界的实心。的默认值允许用户以正常速度拖动边界之外，较高的值将减慢地图拖动边界外的速度，使边界完全稳定，从而防止用户拖动到边界之外。maxBounds0.01.0
      //#endregion
      //#region 键盘导航
      keyboard	:	true,	// 使地图可聚焦，并允许用户使用键盘箭头和/键导航地图。+-
      keyboardPanDelta	:	80,	// 按下箭头键时要平移的像素量。
      //#endregion
      //#region 鼠标滚轮
      scrollWheelZoom	:	true,	// 是否可以使用鼠标滚轮缩放地图。如果通过 ，它将缩放到视图的中心，无论鼠标在哪里。'center'
      wheelDebounceTime	:	40,	// 限制车轮的发射速率（以毫秒为单位）。默认情况下，用户不能通过滚轮每 40 ms 缩放一次以上。
      wheelPxPerZoomLevel	:	60,	// 有多少滚动像素（如L.Domevent.getWheelDelta 报告）表示一个完整缩放级别的更改。较小的值将使车轮缩放速度更快（反之亦然）。
      //#endregion
      //#region 触摸交互
      tap	:	true,	// 支持移动黑客支持即时点击（修复 iOS/Android 上的 200ms 点击延迟）和触摸保持（作为事件触发）。contextmenu
      tapTolerance	:	15,	// 用户在触摸过程中可以移动手指的最大像素数，以使之被视为有效的点击。
      bounceAtZoomLimits	:	true,	// 如果不希望地图缩放超过最小/最大缩放，然后在捏合缩放时反弹，则设置为 false。
      //#endregion
    }
    Object.assign(_mapOptions, mapConfig.mapOptions) // 地图配置初始化

    //#endregion

    //#region 共有变量
    /**
     * leaflet 地图（Map）对象
     * @type {$L.Map}
     */
    this.map = $L.map(_divId, _mapOptions)

    /**
     * 底图控制对象
     * @type {Basemap}
     */
    this.basemap = null
    //#endregion

    //#region 地图对象初始化
    const init = async () => {
      // this.map.on('load', () => {
      this.basemap = new Basemap(this.map, mapConfig.basemapOptions)
      // })
    }
    init()
    //#endregion

  }


}

export async function mapInit (divId, mapConf) {
  window.webMap = new WebMap(divId, mapConf)
}
