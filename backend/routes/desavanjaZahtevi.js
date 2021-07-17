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

var db = mongojs('mongodb+srv://ivan:ivan@cluster0.iikva.mongodb.net/pia?retryWrites=true&w=majority',['desavanjaZahtevi']);

router.post('/zahtevZaDesavanje',function(req,res,next){
    
    var data = {
        korisnik: req.body.korisnik,
        desavanje: req.body.desavanje,
        organizator: req.body.organizator
    }
    
    db.desavanjaZahtevi.save(data,function(err,tmp){
        if(err){ 
            res.send(err);
        }      
        res.json(tmp);
    }) 
});

router.get('/sviZahteviZaDesavanja',function(req,res,next){
    //console.log('Pozvan fja sviZahtevi')
    db.desavanjaZahtevi.find(function(err,users){
        if(err){
            res.send(err);
        }
        res.json(users);
    })
});

router.post('/deleteZahtevZaDesavanje',function(req,res,next){
    console.log('delete')
    db.desavanjaZahtevi.remove({korisnik:req.body.korisnik, desavanje: req.body.desavanje},function(err,user){
        if(err){
            res.send(err);
        }
        res.json(user);
    })
})







module.exports = router;