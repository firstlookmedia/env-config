// Config - Share environment variables between server and client

const rootElementId = 'config';

function isClient() {
  return (typeof window !== 'undefined');
}

class SharedConfig {
  register(configs) {
    Object.assign(this, configs);
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
  hydrate() {
    Object.assign(
      this,
      JSON.parse(document.getElementById(rootElementId).textContent)
    );
  }
}

const envConfig = new SharedConfig();

// parse the server-rendered script tag
if (isClient()) {
  envConfig.hydrate();
}

export default envConfig;
