var express = require('express');
var router = express.Router();
var getdata = require('../models/getData');
var updateType = require('../models/updateType');
/* GET home page. */
router.get('/', function(req, res, next) {
  if(getdata.Oriingkee0801()){
    res.render('index', { title: 'Express' });
  } else{
    res.render('index', {title: 'Express already running'});
  }
});
router.get('/updatetype',function (req, res, next) {
  if(updateType.updateType()){
    res.render('index', { title: 'updateType start' });
  } else{
    res.render('index', {title: 'updateType already running'});

  }

});

module.exports = router;
