env-config
---

Share configs between server and browser

### Install

```bash
$ npm install --save https://github.com/firstlookmedia/env-config
```

### Usage

Register config values on the server, include them in the HTML output:

```jsx
// server.js
// ...
import config from 'env-config';
import App from './App.jsx';

config.register({ ORIGIN: 'http://foobar' });

const app = express();
app.get('*', (req, res) => {
  const reactOutput = ReactDOMServer.renderToString(<App />);
  res.send(`<!doctype html>
<html>
  ...
  <body>
    <div id="root">${reactOutput}</div>
    
    ${config.renderScriptTag()}
    
  </body>
</html>`);
})
```

Hydrate in the browser:

```javascript
// index.js
// ...
import config from 'env-config';
import App from './App';

config.hydrate();

ReactDOM.render(root, <App />);
```

Access values in modules that render on the server as well the browser:

```jsx
// App.jsx
import config from 'env-config';
export default () => (
  <div>{config.ORIGIN}</div>
);

```

---

For usage in tests, call `register()` with mock configs:

```javascript
import config from 'env-config';
config.register({ ORIGIN: 'http://mock' });

describe('test..', () => {
  // ...
});
```

---

Limitations

Modules that import env-config won't see registered values immediately on the server,
since `import` statements all get hoisted to the top. If this is a problem,
the server file should use `require()` like so:

``` javascript
const config = require('env-config');
config.register({
  foo: 'bar',
});

const App = require('./App');
// ...
```

This is usually not an issue if you refer to `config` inside of your functions/classes
