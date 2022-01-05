const express = require('express');
const router = express.Router();
const db = require('../model/db');


router.get("/", function(req,res){
    res.render('index', {title:"EJS 메인페이지"})
})

router.get("/about", function(req, res){
    res.send("About Page");
})

router.post("/postapi", function(req,res){
    let body = req.body;                     //postapi는 body안에  저장해야한다.
    console.log(body)
    res.send('POST API')
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
    db.users.destroy({where:{user_id:target_id}}).then(function(result){
        res.send({success:200})
    })
})

module.exports =router