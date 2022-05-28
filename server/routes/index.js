const express = require('express');
const router = express.Router();

router.get('/', (_req, res) => {
  res.render('index', { title: 'App Bán Lại' });
});

router.get('/apis', (_req, res) => {
  res.render('apis', { title: 'App Bán Lại' });
});

module.exports = router;
