const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const utils = require('./utils.js');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const port = 3000;

const utils = require('./utils.js');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/favorite', (req, res) => {
  utils.sendEvent('engagement', req.path, req.body);
  // future feature will update the local cache with favorite counts
  // future feature will send http to user engagement
  res.status(201).send();
});

app.post('/follow', (req, res) => {
  utils.sendEvent('engagement', req.path, req.body);
  // future feature will update the local cache with follow counts
  // future feature will send http to user engagement
  res.status(201).send();
});

app.post('/tweets', (req, res) => {
  utils.sendEvent('tweets', '/tweets', req.body)
  // future feature will send http to tweet inventory
    .then(tweet => {
      res.status(201).send(tweet);
    });
});

app.get('/feed', (req, res) => {
  let userId = req.query.user_id;
  let count = req.query.count;

  utils.userAccessedInLast10Min(userId, (bool) => {
    if (bool === true) {
      utils.getFeedList(userId, count, (feed) => {
        utils.parseFeed(feed, (tweets) => {
          res.send(tweets);
        });
      });
    } else {
      utils.requestRecentFeed(userId, count, (feed) => {
        utils.parseFeed(feed, (tweets) => {
          res.send(tweets);
        });
      });
    }
  });
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}!`));

module.exports = app;
