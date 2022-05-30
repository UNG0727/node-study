const express = require('express');
const router = express.Router();
const db = require('../model/db');
const url = "https://finance.naver.com/sise/sise_market_sum.naver"

const cheerio = require("cheerio");                  //html을 원하는 코드로 변환해서 가져오기
const axios = require("axios");                      //외부에 요청을 할때 필요
const iconv = require("iconv-lite");                //인코딩

router.get("/excel/down", function(req,res){
    let excel_data = [{"A":1, "B":2, "C":3, "D":4}]
    res.xls('data.xlsx', excel_data);
})


router.get("/excel", function(req,res){
    res.render("excel");
})

router.get("/crawling", function (req,res) {
    
    axios({url:url, method:"GET",responseType:"arraybuffer"}).then(function(html){
        const content = iconv.decode(html.data,"EUC-KR").toString()                     //한글깨짐 방지타입
        const $ = cheerio.load(content)                                                 //제이쿼리좀 사용하기 위한 인자
        
        const table = $(".type_2 tr td")
        table.each(function(i, tag){
            console.log($(tag).text().trim())
        })

        res.send({success:200})
    })                         

})


router.get("/", function(req,res){
    res.render('main', {title:"영화 리뷰 사이트"})
})

router.post("/review/create", function(req,res){
    let movie_id = req.body.movie_id;
    let review = req.body.review;                     //postapi는 body안에  저장해야한다.
    
    if(movie_id == '' || movie_id == 0){
        res.send({ success:400 })
    }else{
        db.reviews.create({
            movie_id:movie_id,
            review:review
        }).then(function(result){
            res.send({ success:200 })
        })
    }
    
})

router.get("/review/read", function(req, res){          //getApi는 query에 들어있다.
    let movie_id = req.query.movie_id;

    db.reviews.findAll({where:{movie_id:movie_id}}).then(function (result) {                //{데이터베이스의 칼럼 : 프론트에서 넘어온 인자}
        res.send({success:200, data:result})
    })  
})

/*
    C: Create
    R: Read
    U: Update
    D: Delete
*/

router.get("/data/create", function(req, res){
    let user_id = parseInt(Math.random() * 10000)                       //자바스크립트 제공 기본함수 
    db.users.create({user_id:user_id}).then(function(result){           //필드값: 변수
        res.send({success:200})
    })
})             

router.get("/data/read", function(req, res){
    db.users.findAll().then(function(result){                          //찾으면 result에 담기게 된다.
        res.send({success:200, data:result})
    })
})

router.post("/data/update", function(req,res){
    let target_id = req.body.target_id;
    db.users.update({user_id:9999},{where:{user_id:target_id}}).then(function(result){          //({무엇을: 어떻게},{무엇을: 지정타켓을})
        res.send({success:200})
    })             
})

router.post("/data/delete",function(req,res){
    let target_id = req.body.target_id;
    db.users.destroy({where:{user_id:target_id}}).then(function(result){                      //무엇을 지울건가!
        res.send({success:200})
    })
})

module.exports =router