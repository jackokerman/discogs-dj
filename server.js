/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const { printArtists } = require('./app/utils.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
const mongoose = require('mongoose');

const { userName, consumerKey, consumerSecret } = require('./config.json').discogs;

if (!userName || !consumerKey || !consumerSecret) {
  console.error('Please specify all discogs config items in config.json');
  process.exit(9);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Discogs = require('disconnect').Client;

mongoose.connect('mongodb://localhost/discogs');
const trackShema = new mongoose.Schema({
  artist: String,
  title: String,
  releaseName: String,
  releaseId: Number,
  bpm: Number,
}, {
  timestamps: true,
});
const Track = mongoose.model('Track', trackShema);

const col = new Discogs().user().collection();
app.get('/api/collection', (req, res) => {
  col.getReleases(userName, 0, req.query, (err, data) => {
    res.json(data);
  });
});

const db = new Discogs({ consumerKey, consumerSecret }).database();
app.get('/api/release/:id', (req, res) => {
  const releaseId = req.params.id;
  db.getRelease(releaseId, (err, data) => {
    Track.find({ releaseId }, (findErr, tracks) => {
      if (findErr) {
        console.log(findErr);
      }
      const trackIds = tracks.reduce((map, track) => {
        map[track.title] = track._id;
        return map;
      }, {});
      const tracklist = data.tracklist.filter(track => track.type_ === 'track').map(track => {
        const { position, title } = track;
        const artist = printArtists(track.artists ? track.artists : data.artists);
        return {
          position,
          title,
          artist,
          trackId: trackIds[title],
          releaseId,
          releaseName: data.title,
        };
      });
      res.json({
        id: data.id,
        artist: printArtists(data.artists),
        title: data.title,
        url: data.uri,
        imageUrl: data.images[0].resource_url,
        label: `${data.labels[0].name} - ${data.labels[0].catno}`,
        releaseDate: data.released_formatted,
        styles: data.styles ? data.styles.join(', ') : 'N/A',
        tracklist,
      });
    });
  });
});

app.post('/api/bag', (req, res) => {
  const track = new Track(req.body);
  track.save((err, newTrack) => {
    if (err) {
      res.send(err);
    }
    res.json(newTrack);
  });
});

app.delete('/api/bag/:id', (req, res) => {
  Track.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Successfully deleted track from bag.' });
  });
});

app.get('/api/bag', (req, res) => {
  Track.find({}, (err, tracks) => {
    if (err) {
      console.log(err);
    }
    res.json(tracks);
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
