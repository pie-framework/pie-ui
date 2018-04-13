 
  //auto generated on: Fri Apr 13 2018 11:39:37 GMT+0530 (IST)
  
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
                "/usr/local/lib/node_modules/pie/node_modules/babel-preset-react/lib/index.js",
                "/usr/local/lib/node_modules/pie/node_modules/babel-preset-env/lib/index.js",
                "/usr/local/lib/node_modules/pie/node_modules/babel-preset-stage-0/lib/index.js"
              ]
            }
          }
        ]
      }
    ]
  },
  "resolveLoader": {
    "modules": [
      "/Users/pmk00006/Documents/projects/pie-ui/packages/protractor/demo/.pie/node_modules",
      "node_modules",
      "/usr/local/lib/node_modules/pie/node_modules"
    ]
  },
  "context": "/Users/pmk00006/Documents/projects/pie-ui/packages/protractor/demo/.pie",
  "entry": "./item.entry.js",
  "output": {
    "filename": "item.bundle.js",
    "path": "/Users/pmk00006/Documents/projects/pie-ui/packages/protractor/demo"
  },
  "resolve": {
    "extensions": [
      ".js",
      ".jsx"
    ],
    "modules": [
      "/Users/pmk00006/Documents/projects/pie-ui/packages/protractor/demo/.pie/.configure/node_modules",
      "/Users/pmk00006/Documents/projects/pie-ui/packages/protractor/demo/.pie/.controllers/node_modules",
      "/Users/pmk00006/Documents/projects/pie-ui/packages/protractor/demo/.pie/node_modules",
      "node_modules",
      "/usr/local/lib/node_modules/pie/node_modules"
    ]
  },
  "devtool": "eval"
};
  