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
import envConfig from 'env-config';

envConfig.register({
  ORIGIN: 'https://thenib.com',
});
```

Then when rendering the index page on the server, include the output of `envConfig.renderScriptTag()`:

```javascript
app.use('*', (req, res) => {
  // This renders an index page template
  res.render('index', {
    envConfigHtml: envConfig.renderScriptTag(),
  });
});

```

In the browser:

```javascript
import envConfig from 'env-config';

const origin = envConfig.ORIGIN;
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
