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

var db = mongojs('mongodb+srv://ivan:ivan@cluster0.iikva.mongodb.net/pia?retryWrites=true&w=majority',['zahtevi']);

router.post('/registracija',upload.single('slika'),function(req,res,next){
    console.log('Pozvana registracija')
    var putanja;
    var tmp = req.body.genericka;
    if(tmp == 'da'){
        
        putanja= "uploads\\genericka.jpg";
        
    }
    else{
        putanja = req.file.path;
    }
    var data = {
        ime: req.body.ime,
        prezime: req.body.prezime,
        username: req.body.username,
        password: req.body.password,
        datumRodj: req.body.datumRodj,
        grad: req.body.grad,
        drzava: req.body.drzava,
        email: req.body.email,
        slika: 'http://localhost:3000/'+putanja,
        tip: req.body.tip,
        pratioci: [],
        obavestenja: [],
        aktivan: ''
    }
    
    db.zahtevi.save(data,function(err,tmp){
        if(err){ 
            res.send(err);
        }      
        res.json(tmp);
    }) 
});

router.get('/sviZahtevi',function(req,res,next){
    console.log('Pozvan fja sviZahtevi')
    db.zahtevi.find(function(err,users){
        if(err){
            res.send(err);
        }
        res.json(users);
    })
});

router.post('/pretragaZahteva',function(req,res,next){
    var data = req.body;
    console.log('Pozvana funkcija')
    console.log(data.username)
    db.zahtevi.find({username: data.username}, function(err,user){
        //console.log('PURY');
        if(err){
            res.send(err);
        }
        console.log(user);
        res.json(user);
    })
});

router.post('/deleteZahtev',function(req,res,next){
    console.log('delete')
    db.zahtevi.remove({username:req.body.username},function(err,user){
        if(err){
            res.send(err);
        }
        res.json(user);
    })
})

module.exports = router;