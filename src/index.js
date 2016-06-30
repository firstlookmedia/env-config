import _ from 'lodash';

// Config - Share environment variables between server and client

const rootElementId = 'config';

class SharedConfig {
  constructor() {
    this.desiredEnvVars = {};
  }

  isClient() {
    return (typeof window !== 'undefined');
  }
  isServer() {
    return (typeof process !== 'undefined');
  }

  registerEnvVar(varName, defaultValue) {
    this.desiredEnvVars[varName] = {
      name: varName,
      defaultValue,
    };
  }

  // extractVarsFromEnv tries to extract the desired values from the environemnt
  extractVarsFromEnv() {
    if (this.isServer()) {
      // Iterate over desired env vars
      _.each(this.desiredEnvVars, (envVar, varName) => {
        let value = process.env[varName];

        // fallback to default value if not found
        value = value || envVar.defaultValue;

        // Extend the config
        this[varName] = value;
      });
    }
  }

  // helper to insert this env on the page
  // i.e. the server should render the html page with this:
  // <html><body><%- config.renderScriptTag() %></body></html>
  renderScriptTag() {
    return (`
      <script id="${rootElementId}" type="application/json">
        ${JSON.stringify(this).replace(/\//g, '\\/')}
      </script>
    `);
  }

  // in the browser, hydrate config as declared above
  hydrateClient() {
    if (this.isClient()) {
      _.extend(this, JSON.parse(document.getElementById(rootElementId).textContent));
    }
  }
}

const envConfig = new SharedConfig();

// parse the server-rendered script tag
// NOTE: this line will only have effect when run on the client
envConfig.hydrateClient();

export default envConfig;
