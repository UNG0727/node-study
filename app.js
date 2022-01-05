const express = require('express');
const helmet = require("helmet");
const app = express();
const ejs = require("ejs");
const db = require('./model/db');

app.set('view engine', 'ejs');      //템플릿엔진을 ejs로 사용
app.set('views', './views');         // views 폴더에 위치
app.use('/public', express.static(__dirname + '/public'));   //html이나 css, 이미지 파일은 여기에 있다

app.use(helmet());
app.use(express.json());               //post방식의 api 사용가능
app.use(express.urlencoded());         //post방식의 api 사용가능


const mainRouter = require('./router/mainRouter')
app.use('/', mainRouter);


app.listen(3000, function(req, res){

    db.sequelize.sync({force:false})                //서버와 DB 연결
    console.log("server running port:3000")
})
