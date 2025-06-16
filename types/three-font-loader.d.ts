declare module 'three/examples/jsm/loaders/FontLoader' {
  import { Loader } from 'three'
  import { Font } from 'three/examples/jsm/loaders/FontLoader'

  export class FontLoader extends Loader {
    load(
      url: string,
      onLoad: (font: Font) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void
    parse(json: any): Font
  }

  export interface FontData {
    glyphs: Record<string, any>
    boundingBox: { xMin: number; xMax: number; yMin: number; yMax: number }
    resolution: number
    underlineThickness: number
    underlinePosition: number
  }

  export class Font {
    data: FontData
    generateShapes(text: string, size: number): any[]
  }
}
