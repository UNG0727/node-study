const express = require('express');
const router = express.Router();
const db = require('../model/db');


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