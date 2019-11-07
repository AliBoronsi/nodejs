var express = require('express');
var router = express.Router();
const ResponseMaker = require('../Utils/ResponseMaker');

/* GET home page. */
router.get('/getUsers', function (req, res, next) {
  const users = [
    {
      id: 0,
      name: 'ali',
    },
    {
      id: 1,
      name: 'amir',
    },
    {
      id: 2,
      name: 'ahmad',
    },
    {
      id: 3,
      name: 'arash',
    }
  ];
  res.json(ResponseMaker.Success(users, 'All Users Received From Server!'));
});

module.exports = router;
