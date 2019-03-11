var createError = require('http-errors');

var express = require('express');
var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 라우팅을 처리하는 js파일을 로드한다.  
const indexRouter = require('./routes/index');
const keywordsRouter = require('./routes/request_auto_keywords');

var app = express();
// express의 인스턴스 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// 응답 화면(views)를 나타내는 파일 경로

app.set('view engine', 'pug');
// 응답 화면(views)를 보여줄 엔진을 pug로 설정


// 미들웨어 함수를 로드하기 위해서는 app.use()를 이용한다. 요청을 받을 때마다 로드된 함수가 실행된다. 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
// 요청에 따른 응답(애플리케이션)에 필요한 static 파일의 경로 설정

const informRequestOccur = function (req, res, next) {
  console.log("요청이 발생했습니다.");
  next();
}

app.use(informRequestOccur);
// 요청이 발생할 때마다 호출

app.use('/index', indexRouter);
// url이 /index로 시작할 때 메인 홈페이지 로드
// 요청이 발생했을 때 indexRouter.js에서 설정한 미들웨어 함수를 로드한다. 

app.use('/request-auto-keywords', keywordsRouter)
// fetch 요청을 감지해서 미들웨어 함수를 실행한다.(요청 url이 /search-auto-keywords로 시작할 때)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
