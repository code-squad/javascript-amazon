const Koa = require('koa')
const Router = require('koa-router')
const functions = require('firebase-functions')
const cors = require('@koa/cors');
const searchData = require('./searchData.json')

const app = new Koa();
const router = new Router();

console.log('a')
app.use(cors());

router.get('/', (ctx, next) => {
  ctx.body = searchData;
});

app.use(router.routes());

const port = 4000;

// app.listen(port, () => {
//   console.log('listen to port %d', port);
// })

const server = app.listen(port, () => {
  console.log(`HITMers-server is running on port ${port}`);
});

module.exports = server;
exports.api = functions.https.onRequest(app.callback());

