// 冗余配置。。。
const dbconfig = {
  host: '',
  user: '',
  password: '',
  database: ''
};

const websiteconfig = {
  port: 3003,
  /**
   * prod: production
   * dev: development
   */
  mode: 'dev'
}

exports.dbconfig = dbconfig;
exports.websiteconfig = websiteconfig;