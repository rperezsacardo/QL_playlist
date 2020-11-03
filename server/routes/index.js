'use strict';

const { Router } = require('express');

const router = new Router();
const routeGuard = require('./../middleware/route-guard');

router.get('/', routeGuard, (req, res, next) => {
  res.json({ type: 'success', data: { title: 'Hello World' } });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.json({});
});

router.get('/private', (req, res, next) => {
  res.json({});
});

module.exports = router;
