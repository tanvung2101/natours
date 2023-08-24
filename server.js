const mongose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! Shutting down ...')
  console.log(err.name, err.message)
    process.exit(1);
})

dotenv.config({ path: './config.env' });

const app = require('./app');

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

mongose.connect(process.env.DATABASE_LOCAL, {
// mongose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).then(() => {
  console.log('DB connection successfully');
})


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message)
  console.log('UNHANDLED REJECTION! Shutting down ...')
  server.close(() => {
    process.exit(1);
  })
})


process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! Shutting down ...')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1);
  })
})
