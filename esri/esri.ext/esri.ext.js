import { esri } from '../loadmodules/loadmodules'

export function loadEsriExt () {

  const { MapView } = esri.views

  MapView.prototype.plusZoom = function (num) {
    this.goTo({
      zoom: this.zoom + num
    })
  }
}
