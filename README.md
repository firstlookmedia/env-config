env-config
---

Share environment variables between server and client.

### Install

```
$ npm install --save https://github.com/firstlookmedia/env-config
```

### Usage

On server
```
import envConfig from 'env-config';

// Register desired env vars and their default values
envConfig.registerEnvVar("ORIGIN", "https://thenib.com");

// Extract the desired values from the environment
envConfig.extractVarsFromEnv();
```

Then when rendering the index page on the server, include the output of `envConfig.renderScriptTag()`.
```
app.use('*', (req, res) => {
  // This renders an index page template
  res.render('index', {
    envConfigHtml: envConfig.renderScriptTag(),
  });
});

```

On client
```
import envConfig from 'env-config';

const origin = envConfig.ORIGIN;
```
