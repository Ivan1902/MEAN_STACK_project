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

var db = mongojs('mongodb+srv://ivan:ivan@cluster0.iikva.mongodb.net/pia?retryWrites=true&w=majority',['desavanjaKomentari']);



router.post('/komentariZaDesavanje',function(req,res,next){
    var data = req.body;
    console.log('Pozvana funkcija komentari za desavanje')
    console.log(data.username)
    db.desavanjaKomentari.find({desavanje: data.naziv}, function(err,user){
        //console.log('PURY');
        if(err){
            res.send(err);
        }
        console.log(user);
        res.json(user);
    })
});

router.post('/insertKomentarZaDesavanje',function(req,res,next){
    console.log('pozvan insert za komentar')
    var data = req.body;
    db.desavanjaKomentari.save(data,function(err,tmp){
        if(err){ 
            res.send(err);
        }      
        res.json(tmp);
    }) 
});





module.exports = router;