var rootElementId = 'config';

function SharedConfig() {}

SharedConfig.prototype.register = function register(configs) {
  Object.assign(this, configs);
};

SharedConfig.prototype.renderScriptTag = function renderScriptTag() {
  return '<script id="' + rootElementId + '" type="application/json">'
       + JSON.stringify(this).replace(/\//g, '\\/')
       + '</script>';
};

SharedConfig.prototype.hydrate = function hydrate() {
  Object.assign(
    this,
    JSON.parse(document.getElementById(rootElementId).textContent)
  );
};

module.exports = new SharedConfig();
