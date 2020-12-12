import { ref } from 'vue'

export class WebMap {

  /**
   * @type {import('esri/Map')}
   */
  #map = null

  constructor () {

    this.t = ref('ArcGIS API for JavaScript')
  }
}
