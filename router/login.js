const express = require('express');
const router = express.Router();
const multiparty = require('multiparty');

const Login = require('../class/login.class');
const _login = new Login();

router.post('/login', (req, res, next) => {
  var form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    var username = fields.username;
    var password = fields.password;
    _login.login(username, password).then((id) => {
      res.json({ code: 0, msg: '登陆成功', data: { id: id } });
    }).catch(() => {
      res.json({ code: 1, msg: '登陆失败' });
    })

  })
})

router.post('/register', (req, res, next) => {
  var form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    var username = fields.username;
    var password = fields.password;
    _login.register(username, password).then(() => {
      res.json({ code: 0, msg: '注册成功' });
    }).catch(() => {
      res.json({ code: 1, msg: '注册失败' });
    })
  })
})

module.exports = router;
