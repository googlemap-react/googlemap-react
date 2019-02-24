There has been similar packages such as
[tomchentw/react-google-maps](https://github.com/tomchentw/react-google-maps),
[google-map-react/google-map-react](https://github.com/google-map-react/google-map-react),
[fullstackreact/google-maps-react](https://github.com/fullstackreact/google-maps-react),
so why bother writing a new library?

The aim is to make an easier-to-use Google Map library for React users,
empowered by `React`'s latest features (`React >= 16.8.0` is required) and
`TypeScript`.

## What is different

### Component position is free (generally)

Google Map components can be placed ANYWHERE in the component tree - you just
need to wrap them all with a `GoogleMapProvider`.

Many other wrapping libraries require that components should be used in a
parent-children paradigm, which can cause inflexibility, especially when the
logic to implement is complex.

> **[NOTE]** The only thing required is that there can only be ONE `MapBox` in
> the context of `GoogleMapProvider`. If you want more than one map instance,
> you can use multiple `GoogleMapProvider`, and event nested
> `GoogleMapProvider`.

### Direct access to Google Map objects

To use methods like `setCenter` or `getZoom`, other libraries rely on the `ref`
prop of React class components. In this package, since all components are
functional, there is no `ref` prop. A different way is used to achieve this
objective.

Currently, the context has two properties: `state` and `dispatch`. As the names
suggest, `state` stores the context state, and `dispatch` is the reduce
function.

`state` has 4 properties:

- `map`, which is a `google.maps.Map` instance.
- `objects`, which is a `Map` storing all `google.maps.MVCObject` instances as
  `id`-`object` pairs
- `service`, which is a `google.maps.places.PlaceService` instance. It will be
  automatically instantiated when `usingPlaces` is `true` in `MapBox`.
- `searches`, which is a `Map` storing all `google.maps.places.SearchBox`
  instances as `id`-`SearchBox` pairs

> **[NOTE]** You should pay as much attention as you can to `id` when using this
> package, if you want to manipulate Google Map objects directly.

### More uniform API

The API is designed to be more uniform. Only `opts` is exposed, making use of
the `setOptions` method which is supported in most Google Map classes. This also
provides adaptability for Google Map API changes.

### Type safe

This package is written in pure `TypeScript` to provide type-safe usage.

## The foundation

### React portal, context, and hooks

- React [`portal`](https://reactjs.org/docs/portals.html) provides an easy way
  to render children into a DOM node that exists outside the DOM hierarchy of
  the parent component. It plays an important role in components like
  `CustomControl` or `OverlayView`.
- React [`context`](https://reactjs.org/docs/context.html) makes it easier to
  share data among a tree of components.
- React [`hooks`](https://reactjs.org/docs/hooks-intro.html) has greatly
  expanded the application of functional components.

### TypeScript

`TypeScript` is a great tool for building more robust JS applications and
libraries.
