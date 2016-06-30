'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Config - Share environment variables between server and client

var rootElementId = 'config';

var SharedConfig = function () {
  function SharedConfig() {
    _classCallCheck(this, SharedConfig);

    this.desiredEnvVars = {};
  }

  _createClass(SharedConfig, [{
    key: 'isClient',
    value: function isClient() {
      return typeof window !== 'undefined';
    }
  }, {
    key: 'isServer',
    value: function isServer() {
      return typeof process !== 'undefined';
    }
  }, {
    key: 'registerEnvVar',
    value: function registerEnvVar(varName, defaultValue) {
      this.desiredEnvVars[varName] = {
        name: varName,
        defaultValue: defaultValue
      };
    }

    // extractVarsFromEnv tries to extract the desired values from the environemnt

  }, {
    key: 'extractVarsFromEnv',
    value: function extractVarsFromEnv() {
      var _this = this;

      if (this.isServer()) {
        // Iterate over desired env vars
        _lodash2.default.each(this.desiredEnvVars, function (envVar, varName) {
          var value = process.env[varName];

          // fallback to default value if not found
          value = value || envVar.defaultValue;

          // Extend the config
          _this[varName] = value;
        });
      }
    }

    // helper to insert this env on the page
    // i.e. the server should render the html page with this:
    // <html><body><%- config.renderScriptTag() %></body></html>

  }, {
    key: 'renderScriptTag',
    value: function renderScriptTag() {
      return '\n      <script id="' + rootElementId + '" type="application/json">\n        ' + JSON.stringify(this).replace(/\//g, '\\/') + '\n      </script>\n    ';
    }

    // in the browser, hydrate config as declared above

  }, {
    key: 'hydrateClient',
    value: function hydrateClient() {
      if (this.isClient()) {
        _lodash2.default.extend(this, JSON.parse(document.getElementById(rootElementId).textContent));
      }
    }
  }]);

  return SharedConfig;
}();

var envConfig = new SharedConfig();

// parse the server-rendered script tag
// NOTE: this line will only have effect when run on the client
envConfig.hydrateClient();

exports.default = envConfig;