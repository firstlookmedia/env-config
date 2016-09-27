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

Components that import env-config won't have them immediately on the server,
since `import` statements all get hoisted to the top. If this is a problem,
the server file should use `require()` like so:

``` javascript
const config = require('env-config');
config.register({
  foo: 'bar',
});

const App = require('./App');
...
```
