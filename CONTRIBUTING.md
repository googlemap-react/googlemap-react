# Contributing

## Issues

Found an issue? Missing a feature or something else? We look forward to receive
your feedback.

For bug reports please make sure that you

- clearly describe your problem
- provide us something that allows us to reproduce the problem (a minimal
  failing example would be awesome)

## Pull Requests

We love pull requests. Here's a quick guide:

1. Fork the repo.

1. Run the tests. We only take pull requests with passing tests, and it's great
   to know that you have a clean state.

1. Add a test for your change. Only refactoring and documentation changes
   require no new tests. If you are adding functionality or fixing a bug, we
   need a test to avoid regressions in future releases.

1. Make the test pass.

1. Push to your fork and submit a pull request.

1. At this point you're waiting on us. We'll give you feedback asap.

**Note:** If you have any problems with a test case don't hesitate to ask us.
Just submit your PR and we'll find a solution together :)

### How to run tests

1. Make sure you have all dependencies installed

```bash
yarn install
```

1. Run the tests with:

```bash
yarn test:lib
```

### How to start the developing environment

After all dependencies are installed, you should first run

```sh
yarn dev:lib
```

Then, start a new shell, and run

```sh
yarn dev:CRA
```

Or, if you want to use the styleguide for instant test, you can run

```sh
yarn styleguide
```

Anytime you modify the code of the lib, the CRA app or the styleguide will
refresh after new bundle is built by microbundle.

### Syntax rules

Please pay attention on the following syntax rules:

- Prettier automatically formats the code style before commits or manually via
  `yarn format`.
- Follow the conventions used in the source already.
