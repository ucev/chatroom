const express = require('express');
const router = express.Router();
const multiparty = require('multiparty');
const path = require('path');
const fs = require('fs');

const Users = require('../class/users.class');
const _users = new Users();

router.post('/login', (req, res, next) => {
  var form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    var username = fields.username;
    var password = fields.password;
    _users.login(username, password).then((data) => {
      res.json({ code: 0, msg: '登陆成功', data: data });
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
    _users.register(username, password).then(() => {
      res.json({ code: 0, msg: '注册成功' });
    }).catch(() => {
      res.json({ code: 1, msg: '注册失败' });
    })
  })
})

router.get('/users', (req, res, next) => {
  var id = req.query.id;
  _users.getFriends(id).then((users) => {
    res.json({ code: 0, msg: '获取成功', data: users });
  }).catch(() => {
    res.json({ code: 1, msg: '获取失败' });
  })
})

router.post('/users/avatar', (req, res, next) => {
  var form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    var userid = fields.userid;
    var tempfile = files.avatar[0].path;
    _users.updateAvatar(userid, tempfile).then(() => {
      res.json({code: 0, msg: '更新成功'});
    }).catch(() => {
      res.json({code: 1, msg: '更新失败'});
    });
  })
})

router.get('/users/userinfo', (req, res, next) => {
  var userid = req.query.userid;
  _users.get(userid).then((data) => {
    var dt = {userid: data.userid, nickname: data.nickname, avatar: data.avatar};
    res.json({code: 0, msg: '获取成功', data: dt});
  }).catch(() => {
    res.json({code: 1, msg: '获取失败'});
  })
})

module.exports = router;
