 
  //auto generated on: Tue Apr 17 2018 12:33:19 GMT-0400 (EDT)
  
  module.exports = {
  "module": {
    "rules": [
      {
        "test": /\.css$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "modules": false
            }
          }
        ]
      },
      {
        "test": /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|otf)$/,
        "use": [
          {
            "loader": "url-loader",
            "options": {
              "limit": 10000
            }
          }
        ]
      },
      {
        "test": /\.less$/,
        "use": [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
      {
        "test": /\.(jsx)?$/,
        "use": [
          {
            "loader": "babel-loader",
            "options": {
              "babelrc": false,
              "presets": [
                "/Users/edeustace/dev/github/pie-framework/pie-cli/node_modules/babel-preset-react/lib/index.js",
                "/Users/edeustace/dev/github/pie-framework/pie-cli/node_modules/babel-preset-env/lib/index.js",
                "/Users/edeustace/dev/github/pie-framework/pie-cli/node_modules/babel-preset-stage-0/lib/index.js"
              ]
            }
          }
        ]
      }
    ]
  },
  "resolveLoader": {
    "modules": [
      "/Users/edeustace/dev/github/pie-framework/pie-ui/packages/text-entry/demo/.pie/node_modules",
      "node_modules",
      "/Users/edeustace/dev/github/pie-framework/pie-cli/node_modules",
      "/Users/edeustace/dev/github/pie-framework/pie-cli/node_modules/pie-support-less/node_modules"
    ]
  },
  "context": "/Users/edeustace/dev/github/pie-framework/pie-ui/packages/text-entry/demo/.pie",
  "entry": "./item.entry.js",
  "output": {
    "filename": "item.bundle.js",
    "path": "/Users/edeustace/dev/github/pie-framework/pie-ui/packages/text-entry/demo"
  },
  "resolve": {
    "extensions": [
      ".js",
      ".jsx"
    ],
    "modules": [
      "/Users/edeustace/dev/github/pie-framework/pie-ui/packages/text-entry/demo/.pie/.configure/node_modules",
      "/Users/edeustace/dev/github/pie-framework/pie-ui/packages/text-entry/demo/.pie/.controllers/node_modules",
      "/Users/edeustace/dev/github/pie-framework/pie-ui/packages/text-entry/demo/.pie/node_modules",
      "node_modules",
      "/Users/edeustace/dev/github/pie-framework/pie-cli/node_modules",
      "/Users/edeustace/dev/github/pie-framework/pie-cli/node_modules/pie-support-less/node_modules"
    ]
  },
  "devtool": "eval"
};
  