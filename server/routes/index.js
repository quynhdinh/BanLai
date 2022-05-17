const express = require('express');
const router = express.Router();

router.get('/', function(_req, res) {
  res.render('index', { title: 'App Bán Lại' });
});

router.get('/apis', function(_req, res) {
  res.render('apis', { title: 'App Bán Lại' });
});

module.exports = router;
