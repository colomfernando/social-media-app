const mongoose = require('mongoose');

class Db {
  static get url() {
    return `mongodb://mongodb:27017/${process.env.DBNAME}`;
  }

  static connect() {
    mongoose
      .connect(Db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Connected to the database!');
      })
      .catch((err) => {
        console.log('Cannot connect to the database!', err);
        // eslint-disable-next-line no-undef
        process.exit();
      });
  }
}

module.exports = Db;
