const Koa = require('koa')
const KoaRouter = require('koa-router')
const json = require('koa-json')
const path = require('path')
const render = require('koa-ejs')
const bodyParser = require('koa-bodyparser')

const app = new Koa();
const router = new KoaRouter();

//Replace with DB for real app
const things = ['My fam', 'Program', 'Music', 'Drz'];


//using koa-json library middleware to format it better
app.use(json()); 
//bodyparse middleware
app.use(bodyParser());

//Add aditional properties to context
app.context.user = 'Stathis';

//app.use(async ctx => (ctx.body = 'Hello world'));
//Simple Middleware Example
//app.use(async ctx => (ctx.body = { msg: 'Hello world' })); //you can output json too

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false,
});

//Routes
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add); //as long the request type is different we can use the same routes

//List of things
async function index(ctx){
  await ctx.render('index', {
    title: 'Things i love:',
    things: things
  })
}
//Show add page
async function showAdd(ctx){
  await ctx.render('add')
}

//Add thing
async function add(ctx) {
  const body = ctx.request.body;
  things.push(body.thing)
  ctx.redirect('/')
}


//Index easier way -- same thing with above though
// router.get('/', async ctx => {
//   await ctx.render('index', {
//     title: 'Things i love:',
//     things: things
//   })
// })

router.get('/test', ctx => (ctx.body = `Hello ${ctx.user}`));
router.get('/test/:name', ctx => (ctx.body = `Hello ${ctx.params.name}`));


//Router Middleware

app.use(router.routes()).use(router.allowedMethods);
app.listen(3000, () => console.log('Server Started..'));