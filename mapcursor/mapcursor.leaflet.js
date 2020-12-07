
const MapCursorType = {
  Default: 'default',
  Pan: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJElEQVQ4T5XTvytGcRTH8dfzJ7AZlDIo2ex+TQaDhaQkGRFhsmAXSRksTJJBMinEYlGUhcHAZjAarDr6Xt3nPi6PU99u3e857/s5n3NuRXksYAmvmMbVT6mVwssGzKIbPRhGO0bxgDNs52uKgCGsYwxzGMzBHrGGTrxlkCJgJV3EcxmrSUnkXaazhYDFUS8gcsODI9wn6CJu/wvYxQS+leYBYVaYFlFsIVMQ/swXAQOIvlpwjutfAJkvVQoOcIfDNKKb3BfKtqQK8JxGFyqaMflfQNDG0YsXjCBU/RY1JkbBR3L4j9qv62PsR9vZFJpwig3s1UGI/6MLT/kx9uEEHamVMk4rLtLUajZxCv3YwXsJoS35FJ7VALIlmkFjCSBWejP54BNJm0cR2+ErQgAAAABJRU5ErkJggg==), default',
  Panning: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABFUlEQVQ4T6XSvytGYRjG8c+7mFjEYjIaKAMLC4syWSxSfmR7M1gkFgyU3sFkYkBJoZR/wI+Sv0AZLUalZDHprufUeU+djjpnec7Tuc/3vu7rvhpqPo2a/ysDTOABO+hM7yN4xXW+aREwjBN8IyBZcS8esZ1gpzgLUB7QhRUMpfMcC6nbPrYSoB89eEIrAzSxjl98YiwV7yZAnNF9FjdJXdwnM8AtLnGFNwxUmBvjtQHuEV3CuANs1AGM47kCMIO1/AiH+Eoq/hONFn5izZkH07jDXtp9FeQFmzFyfo1TuMBRBaQPH1kEikEaTZCQeFwiYwmLMX8xSFn9fJK3WgKYQweWywDdyczBEkBEOqL8XgaoMrDt+x9D2DURq20LzwAAAABJRU5ErkJggg==), default',
  Wait: 'wait'
}

/**
 * 地图鼠标样式类
 */
export class MapCursor {

  constructor (mapDivId) {

    const _mapDom = document.getElementById(mapDivId)
    _mapDom.style.cursor = 'default'

    Object.assign(this, {
      setCursor (type) {
        _mapDom.style.cursor = MapCursorType[type]
      }
    })

  }
}
