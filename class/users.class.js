const mysql = require('mysql');
const md5 = require('../utils/md5');
const dbconfig = require('../configs/config').dbconfig;

class Users {
  constructor() {
    this._tbname = "users";
  }

  register(username, password) {
    var conn = mysql.createConnection(dbconfig);
    var addtime = Math.floor(Date.now() / 1000);
    var cookie = md5(String(username + ":" + addtime + ":" + Math.random()));
    var data = {
      name: username,
      password: md5(password),
      addtime: addtime,
      cookie: cookie
    }
    return new Promise((resolve, reject) => {
      conn.query(`insert into ${this._tbname} set ?`, [data], (err, results, fields) => {
        if (err) {
          conn.end(() => {});
          reject();
        }
        conn.end(() => {});
        resolve(results.insertId);
      })
    })
  }

  login(username, password) {
    var conn = mysql.createConnection(dbconfig);
    return new Promise((resolve, reject) => {
      conn.query(`select * from ${this._tbname} where name = ?`, [username], (err, results, fields) => {
        if (err || !results || results.length == 0) {
          conn.end(() => {});
          reject();
        }
        /**
         * results ?
         */
        var userinfo = results[0];
        if (userinfo && userinfo.password === md5(password)) {
          conn.end(() => {});
          var data = {id: userinfo.id, nickname: userinfo.name};
          resolve(data);
        } else {
          conn.end(() => {});
          reject();
        }
      })
    })
  }

  getFriends(id) {
    var conn = mysql.createConnection(dbconfig);
    return new Promise((resolve, reject) => {
      conn.query(`select * from ${this._tbname} order by id`, (err, results, fields) => {
        if (err || !results) {
          reject();
        }
        var users = results.map((r) => {
          return {id: r.id, name: r.name};
        });
        resolve(users);
      })
    })
  }
}

module.exports = Users;
