import Koa from 'koa'
import Router from 'koa-router'
const cors = require('@koa/cors');
const searchData = require('./searchData.json')

const app = new Koa()
const router = new Router()

app.use(cors());

router.get('/', (ctx, next) => {
  ctx.body = searchData
});

app.use(router.routes())

const port = 4000
app.listen(port, () => {
  console.log('listen to port %d', port)
})