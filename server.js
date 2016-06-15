/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Discogs = require('disconnect').Client;

const col = new Discogs().user().collection();
app.get('/api/collection', (req, res) => {
  col.getReleases('j0k3rman', 0, req.query, (err, data) => {
    res.json(data);
  });
});

const db = new Discogs().database();
app.get('/api/release/:id', (req, res) => {
  const releaseId = req.params.id;
  db.getRelease(releaseId, (err, data) => {
    res.json(data);
  });
});

// webpack hot reloader intiailization
if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(`${__dirname}/dist`));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
