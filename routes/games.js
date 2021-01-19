var express = require('express');
var fs = require('fs');
var router = express.Router();
const ResponseMaker = require('../Utils/ResponseMaker');
const GameModel = require('../Model/game');

router.get('/getClientIp', (req, res, next) => {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.json({ip});
});

/* GET users listing. */
router.get('/getAll', (req, res, next) => {
  fs.readFile('Model/db.json', (err, data) => {
    if (err) {
      res.json(ResponseMaker.Error('خطا در برقراری ارتباط با دیتابیس'));
    }
    res.json(ResponseMaker.Success(JSON.parse(data.toString())));
  });
});

router.post('/new', (req, res, next) => {
  const { p1, g1, p2, g2 } = req.body.game;
  const recordName = req.body.recordName;
  fs.readFile('Model/db.json', (err, data) => {
    if (err) {
      res.json(ResponseMaker.Error('خطا در برقراری ارتباط با دیتابیس'));
    }
    let allGames = JSON.parse(data.toString());
    let maxId = Math.max.apply(Math, allGames[recordName].map(i => i.id)) + 1;
    const game = new GameModel(maxId, p1, g1, p2, g2);
    allGames[recordName].push(game);

    fs.writeFile('Model/db.json', JSON.stringify(allGames), (err) => {
      if (err) {
        res.json(ResponseMaker.Error('خطا در برقراری ارتباط با دیتابیس'));
      }
      res.json(ResponseMaker.Success(game, 'اضافه شد'));
    });
  });
});

router.post('/remove', (req, res, next) => {
  const { recordName, id } = req.body;
  fs.readFile('Model/db.json', (err, data) => {
    if (err) {
      res.json(ResponseMaker.Error('خطا در برقراری ارتباط با دیتابیس'));
    }
    let allGames = JSON.parse(data.toString());
    let index = allGames[recordName].findIndex(e => e.id === id);
    allGames[recordName].splice(index, 1);
    fs.writeFile('Model/db.json', JSON.stringify(allGames), (err) => {
      if (err) {
        res.json(ResponseMaker.Error('خطا در برقراری ارتباط با دیتابیس'));
      }
      res.json(ResponseMaker.Success(null, 'حذف شد'));
    });
  });
});

router.post('/newTable', (req, res, next) => {
  fs.readFile('Model/db.json', (err, data) => {
    if (err) {
      res.json(ResponseMaker.Error('خطا در برقراری ارتباط با دیتابیس'));
    }
    let allGames = JSON.parse(data.toString());
    let maxTableNumber = Math.max.apply(Math, Object.keys(allGames).map(e => parseInt(e)));
    let newTableNumber = maxTableNumber + 1;
    allGames[newTableNumber.toString()] = [];
    fs.writeFile('Model/db.json', JSON.stringify(allGames), (err) => {
      if (err) {
        res.json(ResponseMaker.Error('خطا در برقراری ارتباط با دیتابیس'));
      }
      res.json(ResponseMaker.Success(newTableNumber, 'جدول جدید اضافه شد'));
    });
  });
});

module.exports = router;
