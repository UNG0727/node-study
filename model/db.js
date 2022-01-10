var Sequelize = require('sequelize');
var sequelize;

sequelize = new Sequelize("class101","root","qwer1234",{                //DB 이름, ID, 비밀번호
    host:"localhost",
    port:3306,
    dialect:"mysql",
    timezone: "+09:00",
    define:{
        charset:"utf8",                          //한글 인코딩
        collate:"utf8_general_ci",
        timestamps:true,                         //생성 시 날짜데이터 생성
        freezeTableName:true
    }
})

var db = {};
db.users = sequelize.import(__dirname + "/users.js");    // 상대주소 , 시퀄라이즈 DB 연결
db.test = sequelize.import(__dirname + "/test.js");
db.reviews = sequelize.import(__dirname +"/reviews.js");

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;