const express = require('express');
const router = express.Router();

router.get('/a', (req, res) => {
  res.json({code: 1, msg: 'succ'});
})

module.exports = router;
