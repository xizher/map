const MAP_CURSOR_TYPE = {
  DEFAULT: 'default',
  PAN: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJElEQVQ4T5XTvytGcRTH8dfzJ7AZlDIo2ex+TQaDhaQkGRFhsmAXSRksTJJBMinEYlGUhcHAZjAarDr6Xt3nPi6PU99u3e857/s5n3NuRXksYAmvmMbVT6mVwssGzKIbPRhGO0bxgDNs52uKgCGsYwxzGMzBHrGGTrxlkCJgJV3EcxmrSUnkXaazhYDFUS8gcsODI9wn6CJu/wvYxQS+leYBYVaYFlFsIVMQ/swXAQOIvlpwjutfAJkvVQoOcIfDNKKb3BfKtqQK8JxGFyqaMflfQNDG0YsXjCBU/RY1JkbBR3L4j9qv62PsR9vZFJpwig3s1UGI/6MLT/kx9uEEHamVMk4rLtLUajZxCv3YwXsJoS35FJ7VALIlmkFjCSBWejP54BNJm0cR2+ErQgAAAABJRU5ErkJggg==), default',
  PANNING: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABFUlEQVQ4T6XSvytGYRjG8c+7mFjEYjIaKAMLC4syWSxSfmR7M1gkFgyU3sFkYkBJoZR/wI+Sv0AZLUalZDHprufUeU+djjpnec7Tuc/3vu7rvhpqPo2a/ysDTOABO+hM7yN4xXW+aREwjBN8IyBZcS8esZ1gpzgLUB7QhRUMpfMcC6nbPrYSoB89eEIrAzSxjl98YiwV7yZAnNF9FjdJXdwnM8AtLnGFNwxUmBvjtQHuEV3CuANs1AGM47kCMIO1/AiH+Eoq/hONFn5izZkH07jDXtp9FeQFmzFyfo1TuMBRBaQPH1kEikEaTZCQeFwiYwmLMX8xSFn9fJK3WgKYQweWywDdyczBEkBEOqL8XgaoMrDt+x9D2DURq20LzwAAAABJRU5ErkJggg==), default',
  WAIT: 'wait'
}

/**
 * 地图鼠标样式类
 */
export class MapCursor {

  //#region 私有变量

  /** 地图容器Dom结点Id
   */
  #mapDivId = ''

  /** 地图容器Dom结点
   * @type {HTMLElement}
   */
  #mapDom = null

  /** 鼠标样式标签
   * @type {'default' | 'pan' | 'panning' | 'wait'}
   */
  #cursor = 'default'

  /** 白盒测试 */
  __test__ () {
    this._mapDivId = this.#mapDivId
    this._mapDom = this.#mapDom
    this._cursor = this.#cursor
  }
  //#endregion

  //#region 私有方式

  #init () {
    this.#mapDom = document.getElementById(this.#mapDivId)
    this.setCursor(this.#cursor)
  }

  //#endregion

  constructor (mapDivId) {
    this.#mapDivId = mapDivId
    this.#init()
  }


  //#region 公有方法

  /**
   * 获得当前鼠标样式标签
   * @returns {'default' | 'pan' | 'panning' | 'wait'} 当前鼠标样式标签
   */
  getCursor () {
    return this.#cursor
  }

  /**
   * 设置鼠标样式
   * @param {'default' | 'pan' | 'panning' | 'wait'} type 鼠标类型
   * @returns {MapCursor} this
   */
  setCursor (type) {
    let hasType = false
    const cursorType = type.toUpperCase()
    for (const key in MAP_CURSOR_TYPE) {
      if (cursorType === key) {
        hasType = true
        break
      }
    }
    this.#mapDom.style.cursor = MAP_CURSOR_TYPE[hasType ? type.toUpperCase() : 'DEFAULT']
    return this
  }

  //#endregion

}
