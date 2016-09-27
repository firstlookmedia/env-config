env-config
---

Share configs between server and browser

### Install

```bash
$ npm install --save https://github.com/firstlookmedia/env-config
```

### Usage

Register config values on the server:

```javascript
import config from 'env-config';

config.register({
  ORIGIN: 'https://thenib.com',
});
```

Then when rendering the index page on the server, include the output of `envConfig.renderScriptTag()`:

```javascript
app.use('*', (req, res) => {
  // This renders an index page template
  res.render('index', {
    configHTML: config.renderScriptTag(),
  });
});

```

In the browser, call `hydrate()` before initializing:

```javascript
import config from 'env-config';
config.hydrate();

const origin = config.ORIGIN;
```

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

This is usually not an issue if you refer to `config` inside of your functions/classes:

```jsx
// App.jsx
import config from 'env-config';
export default () => (
  <div>{config.ORIGIN}</div>
);

// index.js
// ...
import config from 'env-config';
import App from './App';
config.register({ ORIGIN: 'http://foobar' });
ReactDOM.render(root, <App />);
```
