 
  //auto generated on: Fri May 11 2018 14:17:20 GMT-0400 (EDT)
  
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
      "/Users/edeustace/dev/github/pie-framework/pie-ui/packages/categorize/demo/.pie/node_modules",
      "node_modules",
      "/Users/edeustace/dev/github/pie-framework/pie-cli/node_modules",
      "/Users/edeustace/dev/github/pie-framework/pie-cli/node_modules/pie-support-less/node_modules"
    ]
  },
  "context": "/Users/edeustace/dev/github/pie-framework/pie-ui/packages/categorize/demo/.pie",
  "entry": "./item.entry.js",
  "output": {
    "filename": "item.bundle.js",
    "path": "/Users/edeustace/dev/github/pie-framework/pie-ui/packages/categorize/demo"
  },
  "resolve": {
    "extensions": [
      ".js",
      ".jsx"
    ],
    "modules": [
      "/Users/edeustace/dev/github/pie-framework/pie-ui/packages/categorize/demo/.pie/.configure/node_modules",
      "/Users/edeustace/dev/github/pie-framework/pie-ui/packages/categorize/demo/.pie/.controllers/node_modules",
      "/Users/edeustace/dev/github/pie-framework/pie-ui/packages/categorize/demo/.pie/node_modules",
      "node_modules",
      "/Users/edeustace/dev/github/pie-framework/pie-cli/node_modules",
      "/Users/edeustace/dev/github/pie-framework/pie-cli/node_modules/pie-support-less/node_modules"
    ]
  },
  "devtool": "eval"
};
  