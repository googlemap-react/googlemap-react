# @googlemap-react/example-next

```sh
yarn dev
```

- `localhost:3000` uses `next/dynamic` to dynamically import the `Map` component
  without SSR.
- `localhost:3000/raw` directly uses the `Map` component. It currently causes a
  warning(see #1).
