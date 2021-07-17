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

var db = mongojs('mongodb+srv://ivan:ivan@cluster0.iikva.mongodb.net/pia?retryWrites=true&w=majority',['zanrovi']);


router.get('/sviZanrovi',function(req,res,next){
    console.log('Pozvan fja sviZanrovi')
    db.zanrovi.find(function(err,users){
        if(err){
            res.send(err);
        }
        res.json(users);
    })
});

router.post('/dohvatiZanr',function(req,res,next){
    console.log('aaaaa')
    console.log(req.body.naziv)
    db.zanrovi.find({naziv: req.body.naziv},function(err,users){
       
        if(err){
            res.send(err);
        }
        //console.log(users);
        res.json(users);
    })
});

router.post('/updateZanr',function(req,res,next){
    
    db.zanrovi.updateOne({naziv: req.body.naziv},
        {$set: {broj: req.body.broj}}, function(err,user){
        if(err){
            res.send(err);
        }
        console.log(user);
        res.json(user);
    })
});

router.post('/insertZanr',function(req,res,next){
    
    var data = req.body;
    db.zanrovi.save(data,function(err,tmp){
        if(err){ 
            res.send(err);
        }      
        res.json(tmp);
    }) 
});

router.post('/deleteZanr',function(req,res,next){
    console.log('delete')
    console.log(req.body.naziv)
    db.zanrovi.remove({naziv:req.body.naziv},function(err,user){
        if(err){
            res.send(err);
        }
        res.json(user);
    })
})

module.exports = router;