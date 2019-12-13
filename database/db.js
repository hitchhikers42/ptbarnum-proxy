const mysql = require('mysql');

const cx = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fec_images'
});

module.exports = {
  connect: () => { cx.connect(); return cx; },
  end: () => cx.end()
}
