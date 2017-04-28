const mysql = require('mysql');
const md5 = require('../utils/md5');
const dbconfig = require('../configs/config').dbconfig;

class Chat {
  constructor() {
    this._tbname = 'chat';
  }

  add(data = undefined) {
    var conn = mysql.createConnection(dbconfig);
    return new Promise((resolve, reject) => {
      conn.query(`insert into ${this._tbname} set ?`, [data], (err, results, fields) => {
        conn.end(() => { });
        if (err) {
          console.log(err);
          reject();
        }
        var insertId = results.insertId;
        resolve(insertId);
      })
    })
  }

  getUnreadedChat(id) {
    var conn = mysql.createConnection(dbconfig);
    return new Promise((resolve, reject) => {
      conn.query(`select * from ${this._tbname} where ${conn.escapeId('to')} = ? and readed = 0`, [id], (err, results, fields) => {
        conn.end(() => { });
        if (err) {
          reject(err);
        }
        resolve(results);
      })
    });
  }

  updateUnreadedChat(infoid, toid) {
    var conn = mysql.createConnection(dbconfig);
    return new Promise((resolve, reject) => {
      conn.query(`update ${this._tbname} set readed = 1 where id = ? and ${conn.escapeId('to')} = ?`, [infoid, toid], (err, results, fields) => {
        if (err) {
          reject();
        }
        resolve();
      })
    })
  }
}

module.exports = Chat;
