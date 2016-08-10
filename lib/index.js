'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Config - Share environment variables between server and client

var rootElementId = 'config';

function isClient() {
  return typeof window !== 'undefined';
}

var SharedConfig = function () {
  function SharedConfig() {
    _classCallCheck(this, SharedConfig);
  }

  _createClass(SharedConfig, [{
    key: 'register',
    value: function register(configs) {
      Object.assign(this, configs);
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
    key: 'hydrate',
    value: function hydrate() {
      Object.assign(this, JSON.parse(document.getElementById(rootElementId).textContent));
    }
  }]);

  return SharedConfig;
}();

var envConfig = new SharedConfig();

// parse the server-rendered script tag
if (isClient()) {
  envConfig.hydrate();
}

exports.default = envConfig;