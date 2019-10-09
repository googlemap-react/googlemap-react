module.exports = {
  title: 'googlemap-react',
  moduleAliases: {
    '@googlemap-react/core': '../..'
  },
  sections: [
    {
      name: 'Introduction',
      content: './docs/Introduction.md',
    },
    {
      name: 'Installation',
      content: './docs/Installation.md',
    },
    {
      name: 'Basic UI Components',
      sections: [
        {
          name: 'Map Containers',
          components:
            './src/components/{MapBox,StreetView,StandaloneStreetView}.tsx',
        },
        {
          name: 'Attachments',
          components:
            './src/components/{Circle,CustomControl,GroundOverlay,InfoWindow,KmlLayer,Marker,OverlayView,Polygon,Polyline,Rectangle}.tsx',
        },
        {
          name: 'Layers',
          components:
            './src/components/{BicyclingLayer,TrafficLayer,TransitLayer}.tsx',
        },
      ],
    },
    {
      name: 'Drawing',
      components: './src/components/DrawingManager.tsx',
    },
    {
      name: 'Places',
      components: './src/components/{Autocomplete,StandaloneAutocomplete,SearchBox,StandaloneSearchBox}.tsx',
    },
    {
      name: 'Visualization',
      components: './src/components/HeatMap.tsx',
    },
  ],
  pagePerSection: true,
  propsParser: require('react-docgen-typescript').parse,
  webpackConfig: {
    resolve: {
      extensions: [".ts", ".tsx"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader"
        },
      ]
    }
  }
}

// To set default example and usage show mode:
// exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
// usageMode: 'collapse', // 'hide' | 'collapse' | 'expand'
