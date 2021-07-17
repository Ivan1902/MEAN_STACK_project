var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var multer = require('multer');
var path = require('path');



var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads');
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({storage: storage});

var db = mongojs('mongodb+srv://ivan:ivan@cluster0.iikva.mongodb.net/pia?retryWrites=true&w=majority',['komentari']);

router.get('/sviKomentari',function(req,res,next){
    db.komentari.find(function(err,users){
        
        if(err){
            res.send(err);
        }
        res.json(users);
    })
});

router.post('/dohvatiKomentar',function(req,res,next){
    console.log(req.body.knjiga)
    db.komentari.find({username: req.body.username, knjiga: req.body.knjiga},function(err,users){
       
        if(err){
            res.send(err);
        }
        //console.log(users);
        res.json(users);
    })
});

router.post('/updateKomentar',function(req,res,next){
    console.log(req.body.tekst)
    db.komentari.updateOne({username: req.body.username,knjiga: req.body.knjiga},
        {$set: {tekst: req.body.tekst, ocena: req.body.ocena}}, function(err,user){
        if(err){
            res.send(err);
        }
        console.log(user);
        res.json(user);
    })
});

router.post('/insertKomentar',function(req,res,next){
    
    var data = req.body;
    db.komentari.save(data,function(err,tmp){
        if(err){ 
            res.send(err);
        }      
        res.json(tmp);
    }) 
});

router.post('/dohvatiSveKomentareKnjige',function(req,res,next){
    //console.log('zzz')
    //console.log(req.body.naziv)
    db.komentari.find({knjiga: req.body.naziv},function(err,users){
       
        if(err){
            res.send(err);
        }
        //console.log(users);
        res.json(users);
    })
});

module.exports = router;