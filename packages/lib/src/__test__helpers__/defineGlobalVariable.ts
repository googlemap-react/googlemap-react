import {EventEmitter} from 'events'

class MVCArray<T> {
  array: Array<T>
  getArray = () => this.array
  removeAt = (index: number) => this.array.splice(index, 1)
  push = (element: T) => this.array.push(element)
  constructor(array: Array<T>) {
    this.array = array
  }
}

// layers

class Layer {
  map?: google.maps.Map
  setMap = (map: google.maps.Map) => (this.map = map)
  constructor() {}
}

class BicyclingLayer extends Layer {
  constructor() {
    super()
  }
}

class TrafficLayer extends Layer {
  opts?: google.maps.TrafficLayerOptions
  setOptions = (opts: google.maps.TrafficLayerOptions) => {
    this.opts = opts
  }
  constructor(opts: google.maps.TrafficLayerOptions) {
    super()
    this.opts = opts
  }
}

class TransitLayer extends Layer {
  constructor() {
    super()
  }
}

// Others

enum ControlPosition {
  BOTTOM_CENTER,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
  LEFT_BOTTOM,
  LEFT_CENTER,
  LEFT_TOP,
  RIGHT_BOTTOM,
  RIGHT_CENTER,
  RIGHT_TOP,
  TOP_CENTER,
  TOP_LEFT,
  TOP_RIGHT,
}

class Circle {
  map?: google.maps.Map | google.maps.StreetViewPanorama
  opts: google.maps.CircleOptions
  setMap = (map: google.maps.Map) => (this.map = map)
  setOptions = (opts: google.maps.CircleOptions) => {
    this.opts = opts
  }
  constructor(opts: google.maps.CircleOptions) {
    this.opts = opts
    this.map = opts.map
  }
}

class DrawingManager extends EventEmitter {
  setOptions = (opts: google.maps.drawing.DrawingManagerOptions) => {}
  constructor() {
    super()
  }
}

class GroundOverlay {
  bounds: google.maps.LatLngBoundsLiteral
  clickable?: boolean
  map?: google.maps.Map | google.maps.StreetViewPanorama
  opacity?: number
  url: string
  getBounds = () => this.bounds
  getOpacity = () => this.opacity
  getUrl = () => this.url
  setMap = (map: google.maps.Map) => (this.map = map)
  setOpacity = (opacity: number) => (this.opacity = opacity)
  constructor(
    url: string,
    bounds: google.maps.LatLngBoundsLiteral,
    opts: google.maps.GroundOverlayOptions,
  ) {
    this.url = url
    this.bounds = bounds
    this.opacity = opts.opacity
    this.clickable = opts.clickable
    this.map = opts.map
  }
}

class InfoWindow {
  close = () => {}
  open = (map?: google.maps.Map, anchor?: google.maps.Marker) => {}
  opts: google.maps.InfoWindowOptions
  setOptions = (opts: google.maps.InfoWindowOptions) => {
    this.opts = opts
  }
  constructor(opts: google.maps.InfoWindowOptions) {
    this.opts = opts
  }
}

class KmlLayer {
  map?: google.maps.Map | google.maps.StreetViewPanorama
  opts: google.maps.KmlLayerOptions
  setMap = (map: google.maps.Map) => (this.map = map)
  setOptions = (opts: google.maps.KmlLayerOptions) => {
    this.opts = opts
  }
  constructor(opts: google.maps.KmlLayerOptions) {
    this.opts = opts
  }
}

class LatLng {
  constructor(lat: number, lng: number) {}
}

class Map {
  controls: MVCArray<Node>[]
  opts: google.maps.MapOptions
  streetView?: google.maps.StreetViewPanorama
  getStreetView = () => this.streetView
  setOptions = (opts: google.maps.MapOptions) => {
    this.opts = opts
  }
  setStreetView = (streetView: google.maps.StreetViewPanorama) => {
    this.streetView = streetView
  }
  constructor(mapDiv: HTMLElement, opts: google.maps.MapOptions) {
    this.opts = opts
    this.controls = Array(ControlPosition.TOP_RIGHT + 1).fill(new MVCArray([]))
  }
}

class Marker {
  map?: google.maps.Map | google.maps.StreetViewPanorama
  opts: google.maps.MarkerOptions
  setMap = (map: google.maps.Map) => (this.map = map)
  setOptions = (opts: google.maps.MarkerOptions) => {
    this.opts = opts
  }
  constructor(opts: google.maps.MarkerOptions) {
    this.opts = opts
    this.map = opts.map
  }
}

class Polygon {
  map?: google.maps.Map | google.maps.StreetViewPanorama
  opts: google.maps.PolygonOptions
  setMap = (map: google.maps.Map) => (this.map = map)
  setOptions = (opts: google.maps.PolygonOptions) => {
    this.opts = opts
  }
  constructor(opts: google.maps.PolygonOptions) {
    this.opts = opts
    this.map = opts.map
  }
}

class Polyline {
  map?: google.maps.Map | google.maps.StreetViewPanorama
  opts: google.maps.PolylineOptions
  setMap = (map: google.maps.Map) => (this.map = map)
  setOptions = (opts: google.maps.PolylineOptions) => {
    this.opts = opts
  }
  constructor(opts: google.maps.PolylineOptions) {
    this.opts = opts
    this.map = opts.map
  }
}

class PlacesService {
  map: google.maps.Map
  constructor(map: google.maps.Map) {
    this.map = map
  }
}

class Rectangle {
  map?: google.maps.Map | google.maps.StreetViewPanorama
  opts: google.maps.RectangleOptions
  setMap = (map: google.maps.Map) => (this.map = map)
  setOptions = (opts: google.maps.RectangleOptions) => {
    this.opts = opts
  }
  constructor(opts: google.maps.RectangleOptions) {
    this.opts = opts
    this.map = opts.map
  }
}

class Autocomplete {
  opts?: google.maps.places.AutocompleteOptions
  setOptions = (opts: google.maps.places.AutocompleteOptions) => {
    this.opts = opts
  }
  constructor(
    inputNode: HTMLInputElement,
    opts?: google.maps.places.AutocompleteOptions,
  ) {}
}

class SearchBox {
  bounds?: google.maps.LatLngBoundsLiteral
  setBounds = (bounds: google.maps.LatLngBoundsLiteral) => {
    this.bounds = bounds
  }
  constructor(
    inputNode: HTMLInputElement,
    opts: google.maps.places.SearchBoxOptions,
  ) {}
}

class StreetViewPanorama {
  opts?: google.maps.StreetViewPanoramaOptions
  visible?: boolean
  setOptions = (opts: google.maps.StreetViewPanoramaOptions) => {
    this.opts = opts
  }
  setVisible = (visible: boolean) => {
    this.visible = visible
  }
  constructor(
    container: HTMLElement,
    opts?: google.maps.StreetViewPanoramaOptions,
  ) {
    this.opts = opts
  }
}

export class HeatmapLayer {
  data: any
  map: null | google.maps.Map
  opts: google.maps.visualization.HeatmapLayerOptions
  setData = (data: any) => {
    this.data = data
  }
  setMap = (map: google.maps.Map) => {
    this.map = map
  }
  constructor(opts: google.maps.visualization.HeatmapLayerOptions) {
    this.opts = opts
    this.map = null
  }
}

class OverlayView {
  map: null | google.maps.Map
  overlayLayer: HTMLElement
  overlayMouseTarget: HTMLElement
  addListener = (eventName: string, handler: Function) => {}
  draw = () => {}
  onAdd = () => {}
  onRemove = () => {}
  getPanes = () => ({
    overlayLayer: this.overlayLayer,
    overlayMouseTarget: this.overlayMouseTarget,
  })
  getProjection = () => ({
    fromLatLngToDivPixel: (latLng: google.maps.LatLng) => ({
      x: 0,
      y: 0,
    }),
  })
  setMap = (map: google.maps.Map | null) => {
    this.map = map
    if (map == null)
      setTimeout(() => {
        this.onRemove()
      }, 100)
    else
      setTimeout(() => {
        this.onAdd()
        setTimeout(() => {
          this.draw()
        }, 100)
      }, 100)
  }
  static preventMapHitsFrom = (el: HTMLElement) => {}
  static preventMapHitsAndGesturesFrom = (el: HTMLElement) => {}
  constructor() {
    this.map = null
    this.overlayLayer = document.createElement('div')
    this.overlayMouseTarget = document.createElement('div')
    document.body.appendChild(this.overlayLayer)
    document.body.appendChild(this.overlayMouseTarget)
  }
}

const defineGlobalVariable = () => {
  Object.defineProperty(global, 'google', {
    value: {
      maps: {
        drawing: {
          DrawingManager: DrawingManager,
        },
        event: {
          addListener(
            instance: google.maps.MVCObject,
            eventName: string,
            handler: (...args: any[]) => any,
          ): google.maps.MapsEventListener {
            if (eventName === 'overlaycomplete') {
              ;((instance as unknown) as EventEmitter).on(eventName, handler)
            }
            return {remove: () => {}}
          },
          addDomListener(
            instance: HTMLElement,
            eventName: string,
            handler: Function,
            capture?: boolean,
          ): google.maps.MapsEventListener {
            return {remove: () => {}}
          },
          trigger(
            instance: google.maps.MVCObject,
            eventName: string,
            ...args: any[]
          ) {
            if (eventName === 'overlaycomplete') {
              ;((instance as unknown) as EventEmitter).emit(eventName, ...args)
            }
          },
        },
        places: {
          Autocomplete: Autocomplete,
          PlacesService: PlacesService,
          SearchBox: SearchBox,
        },
        visualization: {
          HeatmapLayer: HeatmapLayer,
        },
        Animation: {
          BOUNCE: 0,
          DROP: 1,
        },
        BicyclingLayer: BicyclingLayer,
        Circle: Circle,
        ControlPosition: ControlPosition,
        GroundOverlay: GroundOverlay,
        InfoWindow: InfoWindow,
        KmlLayer: KmlLayer,
        LatLng: LatLng,
        Map: Map,
        Marker: Marker,
        OverlayView: OverlayView,
        Polygon: Polygon,
        Polyline: Polyline,
        Rectangle: Rectangle,
        StreetViewPanorama: StreetViewPanorama,
        TrafficLayer: TrafficLayer,
        TransitLayer: TransitLayer,
      },
    },
    writable: true,
  })
  Object.defineProperty((global as any).document, 'createRange', {
    value: () => ({
      createContextualFragment: (fragment: string) => ({
        firstElementChild: document.createElement('input'),
      }),
    }),
  })
}

export default defineGlobalVariable
