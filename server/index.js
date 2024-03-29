const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });
require('./models/products');
require('./models/categories');

mongoose.connect(process.env.DATABASE,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
  console.error('Database Connection Error');
});

const app = require('./app');

const server = app.listen(8080, () => {
  console.log('Express running → PORT 8080');
})
