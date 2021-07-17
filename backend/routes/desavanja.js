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

var db = mongojs('mongodb+srv://ivan:ivan@cluster0.iikva.mongodb.net/pia?retryWrites=true&w=majority',['desavanja']);

router.get('/svaDesavanja',function(req,res,next){
    db.desavanja.find(function(err,users){
        if(err){
            res.send(err);
        }
        res.json(users);
    })
});

router.post('/updateUcesnici',function(req,res,next){
    console.log('updatedesavanja')
    db.desavanja.updateOne({naziv: req.body.naziv},
        {$set: {ucesnici: req.body.ucesnici}}, function(err,user){
        if(err){
            res.send(err);
        }
        //console.log(user);
        res.json(user);
    })
});

router.post('/dodajDesavanje',function(req,res,next){
    console.log('pozvano dodavanje desavanja')

    var data = {
        organizator: req.body.organizator,
        naziv: req.body.naziv,
        pocetak: req.body.pocetak,
        kraj: req.body.kraj,
        opis: req.body.opis,
        ucesnici: typeof(req.body.ucesnici) === 'string'?[req.body.ucesnici]: req.body.ucesnici,
        status: req.body.status,
        tip: req.body.tip
        
        
    }
    db.desavanja.save(data,function(err,temp){
        if(err){
            res.send(err);
        }
        res.json(temp);
    })
})

router.post('/updateDesavanje',function(req,res,next){
    
    db.desavanja.updateOne({naziv: req.body.naziv},
        {$set: {organizator: req.body.organizator,
            naziv: req.body.naziv,
            pocetak: req.body.pocetak,
            kraj: req.body.kraj,
            opis: req.body.opis,
            status: req.body.status,
            ucesnici: req.body.ucesnici,
            tip: req.body.tip}}, function(err,user){
        if(err){
            res.send(err);
        }
        //console.log(user);
        res.json(user);
    })
});



module.exports = router;

