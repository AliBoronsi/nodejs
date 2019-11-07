var express = require('express');
var router = express.Router();
const ResponseMaker = require('../Utils/ResponseMaker');

/* GET home page. */
router.get('/getUsers', function (req, res, next) {
  const users = [
    {
      id: 0,
      name: 'User1',
    },
    {
      id: 1,
      name: 'User2',
    },
    {
      id: 2,
      name: 'User3',
    },
    {
      id: 3,
      name: 'User4',
    }
  ];
  res.json(ResponseMaker.Success(users, 'All Users Received From Server!'));
});

module.exports = router;
