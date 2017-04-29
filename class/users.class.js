const mysql = require('mysql');
const md5 = require('../utils/md5');
const fs = require('fs');
const path = require('path');
const dbconfig = require('../configs/config').dbconfig;

class Users {
  constructor() {
    this._tbname = "users";
  }

  register(username, password) {
    var addtime = Math.floor(Date.now() / 1000);
    var cookie = md5(String(username + ":" + addtime + ":" + Math.random()));
    var data = {
      name: username,
      password: md5(password),
      addtime: addtime,
      cookie: cookie
    }
    return new Promise((resolve, reject) => {
      var conn = mysql.createConnection(dbconfig);
      conn.query(`insert into ${this._tbname} set ?`, [data], (err, results, fields) => {
        conn.end(() => { });
        if (err) {
          reject();
        }
        resolve(results.insertId);
      })
    })
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      var conn = mysql.createConnection(dbconfig);
      conn.query(`select * from ${this._tbname} where name = ?`, [username], (err, results, fields) => {
        conn.end(() => { });
        if (err || !results || results.length == 0) {
          reject();
        }
        /**
         * results ?
         */
        var userinfo = results[0];
        if (userinfo && userinfo.password === md5(password)) {
          var data = { id: userinfo.id, nickname: userinfo.name, avatar: userinfo.avatar };
          resolve(data);
        } else {
          reject();
        }
      })
    }).catch(() => { });
  }

  get(id) {
    return new Promise((resolve, reject) => {
      var conn = mysql.createConnection(dbconfig);
      conn.query(`select id, name, avatar from ${this._tbname} where id = ?`, [id], (err, results, fields) => {
        conn.end(() => { });
        if (err) {
          reject();
        }
        if (results.length == 0) {
          reject();
        }
        resolve(results[0]);
      })
    }).catch(() => { });
  }

  getFriends(id) {
    return new Promise((resolve, reject) => {
      var conn = mysql.createConnection(dbconfig);
      conn.query(`select * from ${this._tbname} order by id`, (err, results, fields) => {
        conn.end(() => { });
        if (err || !results) {
          reject();
        }
        var users = results.map((r) => {
          return { id: r.id, name: r.name, avatar: r.avatar, online: r.online };
        });
        resolve(users);
      })
    }).catch(() => { });
  }

  updateAvatar(userid, tempfile) {
    var fileext = path.extname(tempfile);
    var newname = md5(`${userid}:${Date.now()}`);
    newname = newname + fileext;
    var newpath = path.join(__dirname, '../public/images/avatar', newname);
    return new Promise((resolve, reject) => {
      fs.rename(tempfile, newpath, (err) => {
        if (err) {
          reject();
        }
        resolve();
      })
    }).then(() => {
      return new Promise((resolve, reject) => {
        var conn = mysql.createConnection(dbconfig);
        conn.query(`update ${this._tbname} set ? where id = ?`, [{ avatar: newname }, userid], (err, results, fields) => {
          conn.end(() => { });
          if (err) {
            reject();
          }
          resolve();
        })
      })
    }).catch(() => { });
  }

  updateNickname(userid, nickname) {
    var conn = mysql.createConnection(dbconfig);
    return new Promise((resolve, reject) => {
      conn.query(`select count(*) as cnt from ${this._tbname} where name = ?`, [nickname], (err, results, fields) => {
        if (err) {
          reject({ code: 1, msg: '更新失败' });
        }
        var cnt = results[0].cnt;
        if (cnt > 0) {
          reject({ code: 1, msg: '该昵称已经存在' });
        }
        resolve();
      })
    }).then(() => {
      return new Promise((resolve, reject) => {
        conn.query(`update ${this._tbname} set name = ? where id = ?`, [nickname, userid], (err, results, fields) => {
          if (err) {
            reject({ code: 1, msg: '更新失败' });
          }
          resolve({ code: 0, msg: '更新成功' });
        })
      })
    }).then((data) => {
      conn.end(() => { });
      return data;
    }).catch((data) => {
      return data;
    })
  }

  updateOnlineState(userid, online) {
    return new Promise((resolve, reject) => {
      var conn = mysql.createConnection(dbconfig);
      conn.query(`update ${this._tbname} set online = ? where id = ?`, [online, userid], (err, results, fields) => {
        conn.end(() => { });
        if (err) {
          reject();
        }
        resolve();
      })
    })
  }
}

module.exports = Users;
