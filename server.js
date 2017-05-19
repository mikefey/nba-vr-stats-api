const finalhandler = require('finalhandler');
const http = require('http');
const router = require('router');
const request = require('request');
const appRouter = router();

appRouter.get('/team/:id/stats', (req, res) => {
  const endpoint = 'http://stats.nba.com/stats/teaminfocommon?' +
    'LeagueID=00' +
    '&TeamID=' + req.params.id +
    '&Season=2016-17' +
    '&SeasonType=Regular%20Season';

  const options = {
    url: endpoint,
    rejectUnauthorized: false,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
      'Dnt': '1',
      'Accept-Encoding': 'gzip, deflate, sdch',
      'Accept-Language': 'en',
      'Origin': 'http://stats.nba.com',
      'Referer': 'http://stats.nba.com/player/',
    }
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.end(body);
    }
  });
});

const server = http.createServer((req, res) => {
  appRouter(req, res, finalhandler(req, res));
});

const appPort = process.env.PORT || 4000;
server.listen(appPort);
