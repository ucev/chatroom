const crypto = require('crypto');

function md5(str) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(String(str));
  return md5sum.digest('hex');
}

module.exports = md5;