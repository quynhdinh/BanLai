const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'App Bán Lại' });
});

router.get('/apis', function(req, res) {
  res.render('apis', { title: 'App Bán Lại' });
});

module.exports = router;
